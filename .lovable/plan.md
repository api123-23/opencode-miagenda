# Plan: Clon de Calendly (gestión de turnos)

## Arquitectura general

Tres tipos de actores:
1. **Admin** (uno solo, creado por mí). Solo gestiona usuarios profesionales.
2. **Usuario profesional** (ej. médico). Crea tipos de evento, define disponibilidad semanal, conecta Google Calendar, ve sus reservas.
3. **Cliente final** (no se registra). Entra por una URL pública `/book/<slug>` y reserva como en las imágenes.

## Credenciales admin (las genero yo)
- Email: `admin@calendly-app.local`
- Password: `Admin#2026!Calendly` (te las muestro al final, las podés cambiar luego)

## Base de datos (Supabase)

```text
app_role            enum: 'admin' | 'user'
user_roles          (user_id, role)  -- separado del perfil, anti-recursión RLS
profiles            (id, internal_name, slug, display_name, welcome_message,
                     timezone, location, google_refresh_token, created_at)
availability        (user_id, weekday 0-6, start_time, end_time)
event_types         (id, user_id, name, description, duration_min, color,
                     location, is_active, slug)
event_questions     (id, event_type_id, label, field_type, options[], required, order_idx)
                     field_type: 'text' | 'textarea' | 'email' | 'dropdown' |
                                 'checkbox' | 'radio' | 'phone'
bookings            (id, event_type_id, user_id, start_at, end_at,
                     client_name, client_email, client_answers jsonb,
                     status, google_event_id, created_at)
```
RLS: usuarios solo ven lo suyo; admin ve todo (vía `has_role`); reservas insertables por anónimos solo dentro de slots válidos (vía RPC `book_slot`).

## Páginas / rutas

```text
/auth                          login (sin signup público)
/admin                         (admin) lista de usuarios + crear/editar/borrar
/dashboard                     (user) overview + atajos
/dashboard/event-types         lista de tipos de evento
/dashboard/event-types/$id     editor (nombre, duración, color, preguntas)
/dashboard/availability        grilla L-D con franjas horarias
/dashboard/bookings            reservas próximas/pasadas
/dashboard/integrations        botón "Conectar Google Calendar"
/book/$slug                    paso 1: lista de event types (imagen 1)
/book/$slug/$eventId           paso 2-3: calendario + horarios (imágenes 2-3)
/book/$slug/$eventId/confirm   paso 4: formulario dinámico (imagen 4)
/book/$slug/$eventId/success   paso 5: confirmación (imagen 5)
```

## Server functions / endpoints clave
- `createUserAccount` (admin only) — crea auth user + profile + rol
- `listUsers`, `updateUser`, `deleteUser` (admin)
- CRUD de event types, questions, availability
- `getPublicProfile(slug)`, `getEventType(slug, eventId)`
- `getAvailableSlots(eventId, date)` — calcula slots libres restando reservas existentes
- `createBooking(eventId, start, answers)` — valida slot, inserta, envía email vía Resend, (si hay token Google) crea evento en Calendar
- Google OAuth callback en `/api/public/google/callback`

## Google Calendar
Requiere credenciales OAuth propias (Client ID/Secret de Google Cloud). Construyo:
- UI del botón "Conectar" y flujo OAuth completo en código
- Guardado de refresh_token por usuario
- Creación de eventos al confirmar reserva

Funcionará en cuanto pegues `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` (te indicaré cómo obtenerlos al final). Sin esas keys, todo lo demás funciona; solo se omite la sincronización.

## Emails (Resend)
Vía conector estándar de Lovable. Email de confirmación al cliente y notificación al profesional cuando hay nueva reserva.

## Diseño
Inspirado en Calendly: blanco, tipografía limpia, acento azul/índigo configurable por usuario (color del event type). Totalmente responsive (mobile-first), con grilla 2 columnas en desktop y stack en mobile siguiendo las capturas.

## Orden de ejecución
1. Migración Supabase (enums, tablas, RLS, RPC, trigger de profile).
2. Crear admin seed.
3. Auth + login page + guards.
4. Admin panel.
5. Dashboard usuario (event types, availability, bookings, integrations UI).
6. Flujo público de reserva (5 pantallas).
7. Server fn `getAvailableSlots` + `createBooking`.
8. Resend: conectar y enviar email de confirmación.
9. Google OAuth (UI + endpoint callback) — pendiente de credenciales.
10. Pulido responsive + sitemap/robots.

¿Apruebo y empiezo?
