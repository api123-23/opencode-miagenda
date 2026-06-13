import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function getPublicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

async function getAdminClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

async function createGoogleCalendarEventInternal(
  refreshToken: string,
  eventName: string,
  clientName: string,
  clientEmail: string,
  startAt: string,
  endAt: string,
  bookingId: string,
) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return;

  // Get access token from refresh token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
    }).toString(),
  });
  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok) return;
  const accessToken = tokenJson.access_token;

  // Create calendar event
  const event = {
    summary: eventName,
    description: `Cliente: ${clientName}\nEmail: ${clientEmail}\nID de reserva: ${bookingId}`,
    start: { dateTime: startAt, timeZone: "America/Argentina/Buenos_Aires" },
    end: { dateTime: endAt, timeZone: "America/Argentina/Buenos_Aires" },
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
  if (!calRes.ok) return;

  // Save google_event_id
  const admin = await getAdminClient();
  await admin.from("bookings").update({ google_event_id: calJson.id }).eq("id", bookingId);
}

export const getProfileBySlug = createServerFn({ method: "GET" })
  .validator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(60) }).parse(d))
  .handler(async ({ data }) => {
    const supabase = getPublicClient();
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, display_name, slug, welcome_message, timezone")
      .eq("slug", data.slug)
      .single();
    if (error || !profile) throw new Error("Perfil no encontrado");
    return profile;
  });

export const getPublicEventTypes = createServerFn({ method: "GET" })
  .validator((d: { user_id: string }) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const supabase = getPublicClient();
    const { data: types, error } = await supabase
      .from("event_types")
      .select("*, event_questions(*)")
      .eq("user_id", data.user_id)
      .eq("is_active", true)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return types ?? [];
  });

export const getAvailabilityByUser = createServerFn({ method: "GET" })
  .validator((d: { user_id: string }) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const supabase = getPublicClient();
    const { data: slots, error } = await supabase
      .from("availability")
      .select("*")
      .eq("user_id", data.user_id)
      .order("weekday", { ascending: true })
      .order("start_time", { ascending: true });
    if (error) throw new Error(error.message);
    return slots ?? [];
  });

export const getBookedSlots = createServerFn({ method: "GET" })
  .validator((d: { user_id: string; date: string }) =>
    z.object({ user_id: z.string().uuid(), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }).parse(d))
  .handler(async ({ data }) => {
    const supabase = getPublicClient();
    const dayStart = `${data.date}T00:00:00Z`;
    const dayEnd = `${data.date}T23:59:59Z`;
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("start_at, end_at")
      .eq("user_id", data.user_id)
      .neq("status", "cancelled")
      .gte("start_at", dayStart)
      .lte("start_at", dayEnd);
    if (error) throw new Error(error.message);
    return bookings ?? [];
  });

export const createBooking = createServerFn({ method: "POST" })
  .validator((d: {
    user_id: string;
    event_type_id: string;
    start_at: string;
    end_at: string;
    client_name: string;
    client_email: string;
    client_answers: Record<string, string>;
  }) =>
    z.object({
      user_id: z.string().uuid(),
      event_type_id: z.string().uuid(),
      start_at: z.string(),
      end_at: z.string(),
      client_name: z.string().min(1).max(200),
      client_email: z.string().email(),
      client_answers: z.record(z.string()),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const admin = await getAdminClient();

    // Server-side double-booking prevention
    const { data: existing, error: checkErr } = await admin
      .from("bookings")
      .select("id")
      .eq("user_id", data.user_id)
      .neq("status", "cancelled")
      .lt("start_at", data.end_at)
      .gt("end_at", data.start_at)
      .limit(1);
    if (checkErr) throw new Error(checkErr.message);
    if (existing && existing.length > 0) {
      throw new Error("Este horario ya está reservado");
    }

    const { data: booking, error } = await admin
      .from("bookings")
      .insert({
        user_id: data.user_id,
        event_type_id: data.event_type_id,
        start_at: data.start_at,
        end_at: data.end_at,
        client_name: data.client_name,
        client_email: data.client_email,
        client_answers: data.client_answers,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    // Google Calendar sync
    try {
      const { data: profile } = await admin
        .from("profiles")
        .select("google_refresh_token")
        .eq("id", data.user_id)
        .single();
      if (profile?.google_refresh_token) {
        const { data: eventType } = await admin
          .from("event_types")
          .select("name")
          .eq("id", data.event_type_id)
          .single();
        await createGoogleCalendarEventInternal(
          profile.google_refresh_token,
          eventType?.name ?? "Turno",
          data.client_name,
          data.client_email,
          data.start_at,
          data.end_at,
          booking.id,
        );
      }
    } catch {
      // Google Calendar sync failure is non-critical
    }

    return booking;
  });
