import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listEventTypes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("event_types")
      .select("*, event_questions(*)")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const createEventType = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { name: string; description?: string; duration_min: number; color?: string; location?: string }) =>
    z.object({
      name: z.string().min(1).max(200),
      description: z.string().max(500).optional(),
      duration_min: z.number().min(5).max(480),
      color: z.string().optional(),
      location: z.string().max(200).optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const base = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
    let slug = base;
    let i = 1;
    while (true) {
      const { data: exists } = await context.supabase.from("event_types").select("id").eq("user_id", context.userId).eq("slug", slug).maybeSingle();
      if (!exists) break;
      i += 1;
      slug = `${base}-${i}`;
    }
    const { data: created, error } = await context.supabase
      .from("event_types")
      .insert({ user_id: context.userId, name: data.name, description: data.description ?? "", duration_min: data.duration_min, color: data.color ?? "#3b82f6", location: data.location ?? "", slug })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return created;
  });

export const updateEventType = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string; name?: string; description?: string; duration_min?: number; color?: string; location?: string; is_active?: boolean }) =>
    z.object({
      id: z.string().uuid(),
      name: z.string().min(1).max(200).optional(),
      description: z.string().max(500).optional(),
      duration_min: z.number().min(5).max(480).optional(),
      color: z.string().optional(),
      location: z.string().max(200).optional(),
      is_active: z.boolean().optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { id, ...updates } = data;
    const { error } = await context.supabase.from("event_types").update(updates).eq("id", id).eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteEventType = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("event_types").delete().eq("id", data.id).eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Event questions
export const saveEventQuestions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { event_type_id: string; questions: Array<{ id?: string; label: string; field_type: string; options?: string[]; required: boolean; order_idx: number }> }) =>
    z.object({
      event_type_id: z.string().uuid(),
      questions: z.array(z.object({
        id: z.string().uuid().optional(),
        label: z.string().min(1).max(300),
        field_type: z.enum(["text", "textarea", "email", "phone", "dropdown", "checkbox", "radio"]),
        options: z.array(z.string()).optional(),
        required: z.boolean(),
        order_idx: z.number(),
      })),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("event_questions").delete().eq("event_type_id", data.event_type_id);
    if (data.questions.length > 0) {
      const inserts = data.questions.map((q) => ({
        event_type_id: data.event_type_id,
        label: q.label,
        field_type: q.field_type,
        options: q.options ? JSON.stringify(q.options) : null,
        required: q.required,
        order_idx: q.order_idx,
      }));
      const { error } = await supabaseAdmin.from("event_questions").insert(inserts);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

// Availability
export const getAvailability = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("availability")
      .select("*")
      .eq("user_id", context.userId)
      .order("weekday", { ascending: true })
      .order("start_time", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const saveAvailability = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { slots: Array<{ weekday: number; start_time: string; end_time: string }> }) =>
    z.object({
      slots: z.array(z.object({
        weekday: z.number().min(0).max(6),
        start_time: z.string().regex(/^\d{2}:\d{2}$/),
        end_time: z.string().regex(/^\d{2}:\d{2}$/),
      })),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("availability").delete().eq("user_id", context.userId);
    if (data.slots.length > 0) {
      const inserts = data.slots.map((s) => ({ user_id: context.userId, ...s }));
      const { error } = await supabaseAdmin.from("availability").insert(inserts);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

// Bookings
export const listBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("bookings")
      .select("*, event_types(name, duration_min)")
      .eq("user_id", context.userId)
      .order("start_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const cancelBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("bookings").update({ status: "cancelled" }).eq("id", data.id).eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
