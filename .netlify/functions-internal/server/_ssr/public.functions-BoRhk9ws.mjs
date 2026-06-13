import { c as createServerRpc } from "./createServerRpc-BFCQOodt.mjs";
import { b as createServerFn } from "./server-Bvv6hkd8.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, r as recordType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function getPublicClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
async function getAdminClient() {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  return supabaseAdmin;
}
async function createGoogleCalendarEventInternal(refreshToken, eventName, clientName, clientEmail, startAt, endAt, bookingId) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token"
    }).toString()
  });
  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok) return;
  const accessToken = tokenJson.access_token;
  const event = {
    summary: eventName,
    description: `Cliente: ${clientName}
Email: ${clientEmail}
ID de reserva: ${bookingId}`,
    start: {
      dateTime: startAt,
      timeZone: "America/Argentina/Buenos_Aires"
    },
    end: {
      dateTime: endAt,
      timeZone: "America/Argentina/Buenos_Aires"
    }
  };
  const calRes = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  });
  const calJson = await calRes.json();
  if (!calRes.ok) return;
  const admin = await getAdminClient();
  await admin.from("bookings").update({
    google_event_id: calJson.id
  }).eq("id", bookingId);
}
const getProfileBySlug_createServerFn_handler = createServerRpc({
  id: "f7e3830476ef2ddb8dd2a3cbba47b6b740d88f270038d4698af8c73d488a7513",
  name: "getProfileBySlug",
  filename: "src/lib/public.functions.ts"
}, (opts) => getProfileBySlug.__executeServer(opts));
const getProfileBySlug = createServerFn({
  method: "GET"
}).validator((d) => objectType({
  slug: stringType().min(1).max(60)
}).parse(d)).handler(getProfileBySlug_createServerFn_handler, async ({
  data
}) => {
  const supabase = getPublicClient();
  const {
    data: profile,
    error
  } = await supabase.from("profiles").select("id, display_name, slug, welcome_message, timezone").eq("slug", data.slug).single();
  if (error || !profile) throw new Error("Perfil no encontrado");
  return profile;
});
const getPublicEventTypes_createServerFn_handler = createServerRpc({
  id: "32c3991daf1246c667e57961016e654752332d8c354953ac80de010763dbe5e2",
  name: "getPublicEventTypes",
  filename: "src/lib/public.functions.ts"
}, (opts) => getPublicEventTypes.__executeServer(opts));
const getPublicEventTypes = createServerFn({
  method: "GET"
}).validator((d) => objectType({
  user_id: stringType().uuid()
}).parse(d)).handler(getPublicEventTypes_createServerFn_handler, async ({
  data
}) => {
  const supabase = getPublicClient();
  const {
    data: types,
    error
  } = await supabase.from("event_types").select("*, event_questions(*)").eq("user_id", data.user_id).eq("is_active", true).order("created_at", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return types ?? [];
});
const getAvailabilityByUser_createServerFn_handler = createServerRpc({
  id: "b44eaafab39ad52bc82a2627d7aefeba05c51784877f81d56ae5cf182aea6dbb",
  name: "getAvailabilityByUser",
  filename: "src/lib/public.functions.ts"
}, (opts) => getAvailabilityByUser.__executeServer(opts));
const getAvailabilityByUser = createServerFn({
  method: "GET"
}).validator((d) => objectType({
  user_id: stringType().uuid()
}).parse(d)).handler(getAvailabilityByUser_createServerFn_handler, async ({
  data
}) => {
  const supabase = getPublicClient();
  const {
    data: slots,
    error
  } = await supabase.from("availability").select("*").eq("user_id", data.user_id).order("weekday", {
    ascending: true
  }).order("start_time", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return slots ?? [];
});
const getBookedSlots_createServerFn_handler = createServerRpc({
  id: "b7bf39dc67c51e7920e7c5a5234aaa686c4f5d1f97dcf44dae0e3361a857d642",
  name: "getBookedSlots",
  filename: "src/lib/public.functions.ts"
}, (opts) => getBookedSlots.__executeServer(opts));
const getBookedSlots = createServerFn({
  method: "GET"
}).validator((d) => objectType({
  user_id: stringType().uuid(),
  date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/)
}).parse(d)).handler(getBookedSlots_createServerFn_handler, async ({
  data
}) => {
  const supabase = getPublicClient();
  const dayStart = `${data.date}T00:00:00Z`;
  const dayEnd = `${data.date}T23:59:59Z`;
  const {
    data: bookings,
    error
  } = await supabase.from("bookings").select("start_at, end_at").eq("user_id", data.user_id).neq("status", "cancelled").gte("start_at", dayStart).lte("start_at", dayEnd);
  if (error) throw new Error(error.message);
  return bookings ?? [];
});
const createBooking_createServerFn_handler = createServerRpc({
  id: "4d793d084f61da582101050f1afa312a70d12c1f84d8b3fe4c193412e1cacbd7",
  name: "createBooking",
  filename: "src/lib/public.functions.ts"
}, (opts) => createBooking.__executeServer(opts));
const createBooking = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  user_id: stringType().uuid(),
  event_type_id: stringType().uuid(),
  start_at: stringType(),
  end_at: stringType(),
  client_name: stringType().min(1).max(200),
  client_email: stringType().email(),
  client_answers: recordType(stringType())
}).parse(d)).handler(createBooking_createServerFn_handler, async ({
  data
}) => {
  const admin = await getAdminClient();
  const {
    data: existing,
    error: checkErr
  } = await admin.from("bookings").select("id").eq("user_id", data.user_id).neq("status", "cancelled").lt("start_at", data.end_at).gt("end_at", data.start_at).limit(1);
  if (checkErr) throw new Error(checkErr.message);
  if (existing && existing.length > 0) {
    throw new Error("Este horario ya está reservado");
  }
  const {
    data: booking,
    error
  } = await admin.from("bookings").insert({
    user_id: data.user_id,
    event_type_id: data.event_type_id,
    start_at: data.start_at,
    end_at: data.end_at,
    client_name: data.client_name,
    client_email: data.client_email,
    client_answers: data.client_answers
  }).select().single();
  if (error) throw new Error(error.message);
  try {
    const {
      data: profile
    } = await admin.from("profiles").select("google_refresh_token").eq("id", data.user_id).single();
    if (profile?.google_refresh_token) {
      const {
        data: eventType
      } = await admin.from("event_types").select("name").eq("id", data.event_type_id).single();
      await createGoogleCalendarEventInternal(profile.google_refresh_token, eventType?.name ?? "Turno", data.client_name, data.client_email, data.start_at, data.end_at, booking.id);
    }
  } catch {
  }
  return booking;
});
export {
  createBooking_createServerFn_handler,
  getAvailabilityByUser_createServerFn_handler,
  getBookedSlots_createServerFn_handler,
  getProfileBySlug_createServerFn_handler,
  getPublicEventTypes_createServerFn_handler
};
