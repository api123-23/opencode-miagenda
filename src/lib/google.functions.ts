import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getRequest } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

function getGoogleConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("Google Calendar no configurado");
  return { clientId, clientSecret };
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

export const getGoogleAuthUrl = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { clientId } = getGoogleConfig();
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

export const exchangeGoogleCode = createServerFn({ method: "POST" })
  .validator((d: { code: string }) => z.object({ code: z.string().min(1) }).parse(d))
  .handler(async ({ data }) => {
    const { clientId, clientSecret } = getGoogleConfig();
    const origin = getOrigin();
    const redirectUri = `${origin}/api/auth/google/callback`;
    const body = new URLSearchParams({
      code: data.code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error_description ?? "Error al conectar Google Calendar");
    return {
      access_token: json.access_token,
      refresh_token: json.refresh_token,
      expires_in: json.expires_in,
    };
  });

export const saveGoogleToken = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { refresh_token: string; access_token: string }) =>
    z.object({ refresh_token: z.string().min(1), access_token: z.string().min(1) }).parse(d))
  .handler(async ({ data, context }) => {
    // Get user email from Google
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
    const userInfo = await userRes.json();
    const googleEmail = userInfo.email ?? "";

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ google_refresh_token: data.refresh_token, google_email: googleEmail })
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { email: googleEmail };
  });

export const checkGoogleConnection = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("google_refresh_token, google_email")
      .eq("id", context.userId)
      .single();
    if (error) throw new Error(error.message);
    return {
      connected: !!data?.google_refresh_token,
      email: data?.google_email ?? null,
    };
  });

export const disconnectGoogle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ google_refresh_token: null, google_email: null })
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const createGoogleCalendarEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { booking_id: string }) => z.object({ booking_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: booking, error: bErr } = await supabaseAdmin
      .from("bookings")
      .select("*, event_types(name, description)")
      .eq("id", data.booking_id)
      .single();
    if (bErr || !booking) throw new Error("Booking not found");

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("google_refresh_token")
      .eq("id", context.userId)
      .single();
    if (!profile?.google_refresh_token) throw new Error("Google Calendar no conectado");

    // Refresh token
    const { clientId, clientSecret } = getGoogleConfig();
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        refresh_token: profile.google_refresh_token,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
      }).toString(),
    });
    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok) throw new Error("Error al refrescar token");
    const accessToken = tokenJson.access_token;

    // Create event
    const event = {
      summary: booking.event_types?.name ?? "Turno",
      description: `Cliente: ${booking.client_name}\nEmail: ${booking.client_email}`,
      start: { dateTime: booking.start_at, timeZone: "America/Argentina/Buenos_Aires" },
      end: { dateTime: booking.end_at, timeZone: "America/Argentina/Buenos_Aires" },
    };
    const calRes = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    const calJson = await calRes.json();
    if (!calRes.ok) throw new Error(calJson.message ?? "Error al crear evento en Google Calendar");

    // Save google_event_id
    await supabaseAdmin.from("bookings").update({ google_event_id: calJson.id }).eq("id", data.booking_id);
    return { google_event_id: calJson.id };
  });
