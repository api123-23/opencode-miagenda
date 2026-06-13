import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function sendEmail(payload: { to: string; subject: string; html: string }) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) { console.warn("Resend no configurado"); return; }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Agenda de Turnos <onboarding@resend.dev>",
      ...payload,
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message ?? json.message ?? JSON.stringify(json));
}

function formatDate(startAt: string) {
  return new Date(startAt).toLocaleString("es-AR", {
    dateStyle: "full", timeStyle: "short", timeZone: "America/Argentina/Buenos_Aires",
  });
}

export async function sendConfirmationEmailInternal(opts: {
  to: string; client_name: string; start_at: string;
}) {
  await sendEmail({
    to: opts.to,
    subject: "Turno confirmado",
    html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
      <h2>Turno confirmado</h2>
      <p>Hola <strong>${opts.client_name}</strong>,</p>
      <p>Tu turno fue reservado para el <strong>${formatDate(opts.start_at)}</strong>.</p>
      <p style="color:#666">Si necesitás cancelar o modificar, comunicate con el profesional.</p>
    </div>`,
  });
}

export async function sendNotificationEmailInternal(opts: {
  to: string; client_name: string; start_at: string; event_name: string;
}) {
  await sendEmail({
    to: opts.to,
    subject: "Nuevo turno reservado",
    html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
      <h2>Nuevo turno</h2>
      <p><strong>${opts.client_name}</strong> reservó <strong>${opts.event_name}</strong> para el <strong>${formatDate(opts.start_at)}</strong>.</p>
    </div>`,
  });
}

export const sendConfirmationEmail = createServerFn({ method: "POST" })
  .validator((d: { to: string; client_name: string; start_at: string }) =>
    z.object({ to: z.string().email(), client_name: z.string().min(1), start_at: z.string() }).parse(d),
  )
  .handler(async ({ data }) => {
    await sendConfirmationEmailInternal(data);
    return { ok: true };
  });
