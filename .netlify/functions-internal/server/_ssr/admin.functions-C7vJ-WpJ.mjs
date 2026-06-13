import { c as createServerRpc } from "./createServerRpc-BFCQOodt.mjs";
import { b as createServerFn } from "./server-Bvv6hkd8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DjqZhiQe.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function slugify(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
}
async function assertAdmin(ctx) {
  const {
    data,
    error
  } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin"
  });
  if (error || !data) throw new Error("Forbidden");
}
const listUsers_createServerFn_handler = createServerRpc({
  id: "ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab",
  name: "listUsers",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listUsers.__executeServer(opts));
const listUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listUsers_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: profiles,
    error
  } = await supabaseAdmin.from("profiles").select("id, internal_name, display_name, slug, google_email, timezone, created_at").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  const ids = (profiles ?? []).map((p) => p.id);
  const emails = {};
  for (const id of ids) {
    const {
      data: u
    } = await supabaseAdmin.auth.admin.getUserById(id);
    if (u?.user?.email) emails[id] = u.user.email;
  }
  return (profiles ?? []).map((p) => ({
    ...p,
    email: emails[p.id] ?? ""
  }));
});
const createUserAccount_createServerFn_handler = createServerRpc({
  id: "9f4cccad096f8a3353ec88a2b7e2de3316155b18cc0a12d4decd2198c0b7bd40",
  name: "createUserAccount",
  filename: "src/lib/admin.functions.ts"
}, (opts) => createUserAccount.__executeServer(opts));
const createUserAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  email: stringType().email(),
  password: stringType().min(8).max(128),
  internal_name: stringType().min(1).max(120),
  display_name: stringType().min(1).max(120)
}).parse(d)).handler(createUserAccount_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const base = slugify(data.display_name) || slugify(data.internal_name) || "user";
  let slug = base;
  let i = 1;
  while (true) {
    const {
      data: exists
    } = await supabaseAdmin.from("profiles").select("id").eq("slug", slug).maybeSingle();
    if (!exists) break;
    i += 1;
    slug = `${base}-${i}`;
  }
  const {
    data: created,
    error: cErr
  } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true
  });
  if (cErr || !created.user) throw new Error(cErr?.message ?? "No se pudo crear el usuario");
  const uid = created.user.id;
  const {
    error: pErr
  } = await supabaseAdmin.from("profiles").insert({
    id: uid,
    internal_name: data.internal_name,
    display_name: data.display_name,
    slug
  });
  if (pErr) {
    await supabaseAdmin.auth.admin.deleteUser(uid);
    throw new Error(pErr.message);
  }
  await supabaseAdmin.from("user_roles").insert({
    user_id: uid,
    role: "user"
  });
  return {
    id: uid,
    slug
  };
});
const updateUserAccount_createServerFn_handler = createServerRpc({
  id: "aded4ec668020aef62002ba750961a94129000fc727d392e8717b0cb89ec03a7",
  name: "updateUserAccount",
  filename: "src/lib/admin.functions.ts"
}, (opts) => updateUserAccount.__executeServer(opts));
const updateUserAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  internal_name: stringType().min(1).max(120).optional(),
  display_name: stringType().min(1).max(120).optional(),
  password: stringType().min(8).max(128).optional(),
  email: stringType().email().optional()
}).parse(d)).handler(updateUserAccount_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const profileUpdate = {};
  if (data.internal_name) profileUpdate.internal_name = data.internal_name;
  if (data.display_name) profileUpdate.display_name = data.display_name;
  if (Object.keys(profileUpdate).length > 0) {
    const {
      error
    } = await supabaseAdmin.from("profiles").update(profileUpdate).eq("id", data.id);
    if (error) throw new Error(error.message);
  }
  const authUpdate = {};
  if (data.password) authUpdate.password = data.password;
  if (data.email) authUpdate.email = data.email;
  if (Object.keys(authUpdate).length > 0) {
    const {
      error
    } = await supabaseAdmin.auth.admin.updateUserById(data.id, authUpdate);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
const deleteUserAccount_createServerFn_handler = createServerRpc({
  id: "11b8f7e30db9be9bcaabba5794d8d62f3956f1e9408af54c072dc998a1895b17",
  name: "deleteUserAccount",
  filename: "src/lib/admin.functions.ts"
}, (opts) => deleteUserAccount.__executeServer(opts));
const deleteUserAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteUserAccount_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    error
  } = await supabaseAdmin.auth.admin.deleteUser(data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  createUserAccount_createServerFn_handler,
  deleteUserAccount_createServerFn_handler,
  listUsers_createServerFn_handler,
  updateUserAccount_createServerFn_handler
};
