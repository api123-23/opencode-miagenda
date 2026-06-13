import { c as createServerRpc } from "./createServerRpc-BFCQOodt.mjs";
import { b as createServerFn } from "./server-Bvv6hkd8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DjqZhiQe.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, n as numberType, b as booleanType, a as arrayType, e as enumType } from "../_libs/zod.mjs";
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
const listEventTypes_createServerFn_handler = createServerRpc({
  id: "d1b474b4a57b2c6c989bb19c75103162044641efb5ac4565f89d040237754255",
  name: "listEventTypes",
  filename: "src/lib/user.functions.ts"
}, (opts) => listEventTypes.__executeServer(opts));
const listEventTypes = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listEventTypes_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("event_types").select("*, event_questions(*)").eq("user_id", context.userId).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const createEventType_createServerFn_handler = createServerRpc({
  id: "f423faf74664d3cbf62e656316f2fccc6a389952862b6a21a9ac037fb059a24a",
  name: "createEventType",
  filename: "src/lib/user.functions.ts"
}, (opts) => createEventType.__executeServer(opts));
const createEventType = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  name: stringType().min(1).max(200),
  description: stringType().max(500).optional(),
  duration_min: numberType().min(5).max(480),
  color: stringType().optional(),
  location: stringType().max(200).optional()
}).parse(d)).handler(createEventType_createServerFn_handler, async ({
  data,
  context
}) => {
  const base = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
  let slug = base;
  let i = 1;
  while (true) {
    const {
      data: exists
    } = await context.supabase.from("event_types").select("id").eq("user_id", context.userId).eq("slug", slug).maybeSingle();
    if (!exists) break;
    i += 1;
    slug = `${base}-${i}`;
  }
  const {
    data: created,
    error
  } = await context.supabase.from("event_types").insert({
    user_id: context.userId,
    name: data.name,
    description: data.description ?? "",
    duration_min: data.duration_min,
    color: data.color ?? "#3b82f6",
    location: data.location ?? "",
    slug
  }).select().single();
  if (error) throw new Error(error.message);
  return created;
});
const updateEventType_createServerFn_handler = createServerRpc({
  id: "173892e1b5fe2831b52872f35c44e4d3161478a643bf875adfbe625afb0294de",
  name: "updateEventType",
  filename: "src/lib/user.functions.ts"
}, (opts) => updateEventType.__executeServer(opts));
const updateEventType = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  name: stringType().min(1).max(200).optional(),
  description: stringType().max(500).optional(),
  duration_min: numberType().min(5).max(480).optional(),
  color: stringType().optional(),
  location: stringType().max(200).optional(),
  is_active: booleanType().optional()
}).parse(d)).handler(updateEventType_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    id,
    ...updates
  } = data;
  const {
    error
  } = await context.supabase.from("event_types").update(updates).eq("id", id).eq("user_id", context.userId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const deleteEventType_createServerFn_handler = createServerRpc({
  id: "eba23e6386c6193fb2e803dd555759c04497be0e754256b0c923b6feed750cdf",
  name: "deleteEventType",
  filename: "src/lib/user.functions.ts"
}, (opts) => deleteEventType.__executeServer(opts));
const deleteEventType = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteEventType_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    error
  } = await context.supabase.from("event_types").delete().eq("id", data.id).eq("user_id", context.userId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const saveEventQuestions_createServerFn_handler = createServerRpc({
  id: "7a0bb74e960c5cf78dd9da1f9c979702588e7aa300fe73cc2e617a75dd8c25e5",
  name: "saveEventQuestions",
  filename: "src/lib/user.functions.ts"
}, (opts) => saveEventQuestions.__executeServer(opts));
const saveEventQuestions = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  event_type_id: stringType().uuid(),
  questions: arrayType(objectType({
    id: stringType().uuid().optional(),
    label: stringType().min(1).max(300),
    field_type: enumType(["text", "textarea", "email", "phone", "dropdown", "checkbox", "radio"]),
    options: arrayType(stringType()).optional(),
    required: booleanType(),
    order_idx: numberType()
  }))
}).parse(d)).handler(saveEventQuestions_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  await supabaseAdmin.from("event_questions").delete().eq("event_type_id", data.event_type_id);
  if (data.questions.length > 0) {
    const inserts = data.questions.map((q) => ({
      event_type_id: data.event_type_id,
      label: q.label,
      field_type: q.field_type,
      options: q.options ? JSON.stringify(q.options) : null,
      required: q.required,
      order_idx: q.order_idx
    }));
    const {
      error
    } = await supabaseAdmin.from("event_questions").insert(inserts);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
const getAvailability_createServerFn_handler = createServerRpc({
  id: "0dcfda8170a167fd57a8aeeadbe0dd404cf28be38be865788869518a6df2302c",
  name: "getAvailability",
  filename: "src/lib/user.functions.ts"
}, (opts) => getAvailability.__executeServer(opts));
const getAvailability = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getAvailability_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("availability").select("*").eq("user_id", context.userId).order("weekday", {
    ascending: true
  }).order("start_time", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const saveAvailability_createServerFn_handler = createServerRpc({
  id: "5c00dbca2b7089f74839d8b981765192c65336077763546e29d61a8e485b2ffc",
  name: "saveAvailability",
  filename: "src/lib/user.functions.ts"
}, (opts) => saveAvailability.__executeServer(opts));
const saveAvailability = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  slots: arrayType(objectType({
    weekday: numberType().min(0).max(6),
    start_time: stringType().regex(/^\d{2}:\d{2}$/),
    end_time: stringType().regex(/^\d{2}:\d{2}$/)
  }))
}).parse(d)).handler(saveAvailability_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  await supabaseAdmin.from("availability").delete().eq("user_id", context.userId);
  if (data.slots.length > 0) {
    const inserts = data.slots.map((s) => ({
      user_id: context.userId,
      ...s
    }));
    const {
      error
    } = await supabaseAdmin.from("availability").insert(inserts);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
const listBookings_createServerFn_handler = createServerRpc({
  id: "2b9481384f4d67eb22e40eae59acd81f939162e75bd11d6264e5e4ae608f454b",
  name: "listBookings",
  filename: "src/lib/user.functions.ts"
}, (opts) => listBookings.__executeServer(opts));
const listBookings = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listBookings_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("bookings").select("*, event_types(name, duration_min)").eq("user_id", context.userId).order("start_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const cancelBooking_createServerFn_handler = createServerRpc({
  id: "68f916ba9ede0f27abab1fb23b50b234805abd1ae48e61b321f3400073b58d94",
  name: "cancelBooking",
  filename: "src/lib/user.functions.ts"
}, (opts) => cancelBooking.__executeServer(opts));
const cancelBooking = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(cancelBooking_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    error
  } = await context.supabase.from("bookings").update({
    status: "cancelled"
  }).eq("id", data.id).eq("user_id", context.userId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  cancelBooking_createServerFn_handler,
  createEventType_createServerFn_handler,
  deleteEventType_createServerFn_handler,
  getAvailability_createServerFn_handler,
  listBookings_createServerFn_handler,
  listEventTypes_createServerFn_handler,
  saveAvailability_createServerFn_handler,
  saveEventQuestions_createServerFn_handler,
  updateEventType_createServerFn_handler
};
