import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

async function assertAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase.rpc("has_role", { _user_id: ctx.userId, _role: "admin" });
  if (error || !data) throw new Error("Forbidden");
}

export const listUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: profiles, error } = await supabaseAdmin
      .from("profiles")
      .select("id, internal_name, display_name, slug, google_email, timezone, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);

    // attach auth emails
    const ids = (profiles ?? []).map((p) => p.id);
    const emails: Record<string, string> = {};
    for (const id of ids) {
      const { data: u } = await supabaseAdmin.auth.admin.getUserById(id);
      if (u?.user?.email) emails[id] = u.user.email;
    }
    return (profiles ?? []).map((p) => ({ ...p, email: emails[p.id] ?? "" }));
  });

export const createUserAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { email: string; password: string; internal_name: string; display_name: string }) =>
    z
      .object({
        email: z.string().email(),
        password: z.string().min(8).max(128),
        internal_name: z.string().min(1).max(120),
        display_name: z.string().min(1).max(120),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Build unique slug
    const base = slugify(data.display_name) || slugify(data.internal_name) || "user";
    let slug = base;
    let i = 1;
    while (true) {
      const { data: exists } = await supabaseAdmin.from("profiles").select("id").eq("slug", slug).maybeSingle();
      if (!exists) break;
      i += 1;
      slug = `${base}-${i}`;
    }

    const { data: created, error: cErr } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (cErr || !created.user) throw new Error(cErr?.message ?? "No se pudo crear el usuario");
    const uid = created.user.id;

    const { error: pErr } = await supabaseAdmin.from("profiles").insert({
      id: uid,
      internal_name: data.internal_name,
      display_name: data.display_name,
      slug,
    });
    if (pErr) {
      await supabaseAdmin.auth.admin.deleteUser(uid);
      throw new Error(pErr.message);
    }
    await supabaseAdmin.from("user_roles").insert({ user_id: uid, role: "user" });

    return { id: uid, slug };
  });

export const updateUserAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string; internal_name?: string; display_name?: string; password?: string; email?: string }) =>
    z
      .object({
        id: z.string().uuid(),
        internal_name: z.string().min(1).max(120).optional(),
        display_name: z.string().min(1).max(120).optional(),
        password: z.string().min(8).max(128).optional(),
        email: z.string().email().optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const profileUpdate: { internal_name?: string; display_name?: string } = {};
    if (data.internal_name) profileUpdate.internal_name = data.internal_name;
    if (data.display_name) profileUpdate.display_name = data.display_name;
    if (Object.keys(profileUpdate).length > 0) {
      const { error } = await supabaseAdmin.from("profiles").update(profileUpdate).eq("id", data.id);
      if (error) throw new Error(error.message);
    }

    const authUpdate: { password?: string; email?: string } = {};
    if (data.password) authUpdate.password = data.password;
    if (data.email) authUpdate.email = data.email;
    if (Object.keys(authUpdate).length > 0) {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(data.id, authUpdate);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteUserAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
