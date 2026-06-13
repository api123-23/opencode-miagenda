import { c as createServerRpc } from "./createServerRpc-BFCQOodt.mjs";
import { b as createServerFn, g as getRequest } from "./server-Bvv6hkd8.mjs";
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
function getGoogleConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("Google Calendar no configurado");
  return {
    clientId,
    clientSecret
  };
}
function getOrigin() {
  const explicitUri = process.env.GOOGLE_REDIRECT_URI;
  if (explicitUri) return explicitUri.replace(/\/api\/auth\/google\/callback$/, "");
  const req = getRequest();
  const host = req?.headers?.get("host");
  const proto = req?.headers?.get("x-forwarded-proto") ?? "http";
  if (host) return `${proto}://${host}`;
  if (process.env.APP_URL) return process.env.APP_URL;
  throw new Error("GOOGLE_REDIRECT_URI o APP_URL debe estar configurado en el entorno");
}
const getGoogleAuthUrl_createServerFn_handler = createServerRpc({
  id: "76fed9ebc4c2f59a27591c84587c290042df3a78cb5258e9b98f3adae97fff76",
  name: "getGoogleAuthUrl",
  filename: "src/lib/google.functions.ts"
}, (opts) => getGoogleAuthUrl.__executeServer(opts));
const getGoogleAuthUrl = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getGoogleAuthUrl_createServerFn_handler, async ({
  context
}) => {
  const {
    clientId
  } = getGoogleConfig();
  const origin = getOrigin();
  const redirectUri = `${origin}/api/auth/google/callback`;
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "https://www.googleapis.com/auth/calendar");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("state", context.userId);
  return url.toString();
});
const exchangeGoogleCode_createServerFn_handler = createServerRpc({
  id: "a73dc1c4c892eb9e9d21f3a7743338d519157153972a310720471befa5ebc05e",
  name: "exchangeGoogleCode",
  filename: "src/lib/google.functions.ts"
}, (opts) => exchangeGoogleCode.__executeServer(opts));
const exchangeGoogleCode = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  code: stringType().min(1)
}).parse(d)).handler(exchangeGoogleCode_createServerFn_handler, async ({
  data
}) => {
  const {
    clientId,
    clientSecret
  } = getGoogleConfig();
  const origin = getOrigin();
  const redirectUri = `${origin}/api/auth/google/callback`;
  const body = new URLSearchParams({
    code: data.code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code"
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body.toString()
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error_description ?? "Error al conectar Google Calendar");
  return {
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    expires_in: json.expires_in
  };
});
const saveGoogleToken_createServerFn_handler = createServerRpc({
  id: "43f10d2b99501b279c0dcdfa8d7db9e510c42dca92445810ed7db8852f64deef",
  name: "saveGoogleToken",
  filename: "src/lib/google.functions.ts"
}, (opts) => saveGoogleToken.__executeServer(opts));
const saveGoogleToken = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  refresh_token: stringType().min(1),
  access_token: stringType().min(1)
}).parse(d)).handler(saveGoogleToken_createServerFn_handler, async ({
  data,
  context
}) => {
  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${data.access_token}`
    }
  });
  const userInfo = await userRes.json();
  const googleEmail = userInfo.email ?? "";
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    error
  } = await supabaseAdmin.from("profiles").update({
    google_refresh_token: data.refresh_token,
    google_email: googleEmail
  }).eq("id", context.userId);
  if (error) throw new Error(error.message);
  return {
    email: googleEmail
  };
});
const checkGoogleConnection_createServerFn_handler = createServerRpc({
  id: "3f29bde68ae6680eb2c84b72d3e562aa4220a132e0f3d84b8fa55e2401076c6e",
  name: "checkGoogleConnection",
  filename: "src/lib/google.functions.ts"
}, (opts) => checkGoogleConnection.__executeServer(opts));
const checkGoogleConnection = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(checkGoogleConnection_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("profiles").select("google_refresh_token, google_email").eq("id", context.userId).single();
  if (error) throw new Error(error.message);
  return {
    connected: !!data?.google_refresh_token,
    email: data?.google_email ?? null
  };
});
const disconnectGoogle_createServerFn_handler = createServerRpc({
  id: "34a9282b970edd1ae6193bf0f10ba7050e289d9a7857497f090f5e80ecbc2ae1",
  name: "disconnectGoogle",
  filename: "src/lib/google.functions.ts"
}, (opts) => disconnectGoogle.__executeServer(opts));
const disconnectGoogle = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(disconnectGoogle_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    error
  } = await supabaseAdmin.from("profiles").update({
    google_refresh_token: null,
    google_email: null
  }).eq("id", context.userId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const createGoogleCalendarEvent_createServerFn_handler = createServerRpc({
  id: "1961a5c5333f7d9395017126ee580eef50483500cede57aacc2a0914b06cb7fd",
  name: "createGoogleCalendarEvent",
  filename: "src/lib/google.functions.ts"
}, (opts) => createGoogleCalendarEvent.__executeServer(opts));
const createGoogleCalendarEvent = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  booking_id: stringType().uuid()
}).parse(d)).handler(createGoogleCalendarEvent_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: booking,
    error: bErr
  } = await supabaseAdmin.from("bookings").select("*, event_types(name, description)").eq("id", data.booking_id).single();
  if (bErr || !booking) throw new Error("Booking not found");
  const {
    data: profile
  } = await supabaseAdmin.from("profiles").select("google_refresh_token").eq("id", context.userId).single();
  if (!profile?.google_refresh_token) throw new Error("Google Calendar no conectado");
  const {
    clientId,
    clientSecret
  } = getGoogleConfig();
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      refresh_token: profile.google_refresh_token,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token"
    }).toString()
  });
  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok) throw new Error("Error al refrescar token");
  const accessToken = tokenJson.access_token;
  const event = {
    summary: booking.event_types?.name ?? "Turno",
    description: `Cliente: ${booking.client_name}
Email: ${booking.client_email}`,
    start: {
      dateTime: booking.start_at,
      timeZone: "America/Argentina/Buenos_Aires"
    },
    end: {
      dateTime: booking.end_at,
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
  if (!calRes.ok) throw new Error(calJson.message ?? "Error al crear evento en Google Calendar");
  await supabaseAdmin.from("bookings").update({
    google_event_id: calJson.id
  }).eq("id", data.booking_id);
  return {
    google_event_id: calJson.id
  };
});
export {
  checkGoogleConnection_createServerFn_handler,
  createGoogleCalendarEvent_createServerFn_handler,
  disconnectGoogle_createServerFn_handler,
  exchangeGoogleCode_createServerFn_handler,
  getGoogleAuthUrl_createServerFn_handler,
  saveGoogleToken_createServerFn_handler
};
