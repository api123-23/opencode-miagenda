import { c as createServerRpc } from "./createServerRpc-BFCQOodt.mjs";
import { b as createServerFn } from "./server-Bvv6hkd8.mjs";
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
async function sendEmail(payload) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("Resend no configurado");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Agenda de Turnos <onboarding@resend.dev>",
      ...payload
    })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message ?? json.message ?? JSON.stringify(json));
}
function formatDate(startAt) {
  return new Date(startAt).toLocaleString("es-AR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires"
  });
}
async function sendConfirmationEmailInternal(opts) {
  await sendEmail({
    to: opts.to,
    subject: "Turno confirmado",
    html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
      <h2>Turno confirmado</h2>
      <p>Hola <strong>${opts.client_name}</strong>,</p>
      <p>Tu turno fue reservado para el <strong>${formatDate(opts.start_at)}</strong>.</p>
      <p style="color:#666">Si necesitás cancelar o modificar, comunicate con el profesional.</p>
    </div>`
  });
}
const sendConfirmationEmail_createServerFn_handler = createServerRpc({
  id: "2296ed16a700d9f187c4ea9b347a458c4a773514f363748b871fb70a5acf8480",
  name: "sendConfirmationEmail",
  filename: "src/lib/email.functions.ts"
}, (opts) => sendConfirmationEmail.__executeServer(opts));
const sendConfirmationEmail = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  to: stringType().email(),
  client_name: stringType().min(1),
  start_at: stringType()
}).parse(d)).handler(sendConfirmationEmail_createServerFn_handler, async ({
  data
}) => {
  await sendConfirmationEmailInternal(data);
  return {
    ok: true
  };
});
export {
  sendConfirmationEmail_createServerFn_handler
};
