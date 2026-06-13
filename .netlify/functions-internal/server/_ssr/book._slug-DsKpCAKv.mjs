import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn, c as createSsrRpc } from "./useServerFn-CIY9_c2w.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as cn } from "./card-DFdj6CNt.mjs";
import { B as Button, L as Label, I as Input } from "./label-C0xBDsBE.mjs";
import { T as Textarea, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ZagbfIAy.mjs";
import { R as RadioGroup$1, a as RadioGroupItem$1, b as RadioGroupIndicator } from "../_libs/radix-ui__react-radio-group.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { R as Root } from "../_libs/radix-ui__react-separator.mjs";
import { b as createServerFn } from "./server-Bvv6hkd8.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Route$3 } from "./router-DJfNjEB8.mjs";
import "../_libs/seroval.mjs";
import { s as startOfDay, a as addDays, f as format, p as parseISO, e as es } from "../_libs/date-fns.mjs";
import { L as LoaderCircle, a as Calendar, b as CircleCheck, c as Clock, d as ChevronLeft, e as ChevronRight, f as Circle, g as Check } from "../_libs/lucide-react.mjs";
import { o as objectType, r as recordType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./client-xQt6fTOx.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
const getProfileBySlug = createServerFn({
  method: "GET"
}).validator((d) => objectType({
  slug: stringType().min(1).max(60)
}).parse(d)).handler(createSsrRpc("f7e3830476ef2ddb8dd2a3cbba47b6b740d88f270038d4698af8c73d488a7513"));
const getPublicEventTypes = createServerFn({
  method: "GET"
}).validator((d) => objectType({
  user_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("32c3991daf1246c667e57961016e654752332d8c354953ac80de010763dbe5e2"));
const getAvailabilityByUser = createServerFn({
  method: "GET"
}).validator((d) => objectType({
  user_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("b44eaafab39ad52bc82a2627d7aefeba05c51784877f81d56ae5cf182aea6dbb"));
const getBookedSlots = createServerFn({
  method: "GET"
}).validator((d) => objectType({
  user_id: stringType().uuid(),
  date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/)
}).parse(d)).handler(createSsrRpc("b7bf39dc67c51e7920e7c5a5234aaa686c4f5d1f97dcf44dae0e3361a857d642"));
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
}).parse(d)).handler(createSsrRpc("4d793d084f61da582101050f1afa312a70d12c1f84d8b3fe4c193412e1cacbd7"));
const RadioGroup = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroup$1, { className: cn("grid gap-2", className), ...props, ref });
});
RadioGroup.displayName = RadioGroup$1.displayName;
const RadioGroupItem = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RadioGroupItem$1,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupIndicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const Separator = reactExports.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = Root.displayName;
function BookPage() {
  const {
    slug
  } = Route$3.useParams();
  const getProfile = useServerFn(getProfileBySlug);
  const getEvents = useServerFn(getPublicEventTypes);
  const getAvail = useServerFn(getAvailabilityByUser);
  const getBooked = useServerFn(getBookedSlots);
  const createB = useServerFn(createBooking);
  const profileQ = useQuery({
    queryKey: ["public-profile", slug],
    queryFn: () => getProfile({
      data: {
        slug
      }
    })
  });
  const eventsQ = useQuery({
    queryKey: ["public-events", profileQ.data?.id],
    queryFn: () => getEvents({
      data: {
        user_id: profileQ.data.id
      }
    }),
    enabled: !!profileQ.data
  });
  const availQ = useQuery({
    queryKey: ["public-avail", profileQ.data?.id],
    queryFn: () => getAvail({
      data: {
        user_id: profileQ.data.id
      }
    }),
    enabled: !!profileQ.data
  });
  const [step, setStep] = reactExports.useState("event");
  const [selectedEvent, setSelectedEvent] = reactExports.useState(null);
  const [selectedDate, setSelectedDate] = reactExports.useState(null);
  const [selectedTime, setSelectedTime] = reactExports.useState(null);
  const [clientName, setClientName] = reactExports.useState("");
  const [clientEmail, setClientEmail] = reactExports.useState("");
  const [answers, setAnswers] = reactExports.useState({});
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [bookingResult, setBookingResult] = reactExports.useState(null);
  const weekDates = reactExports.useMemo(() => {
    const today = startOfDay(/* @__PURE__ */ new Date());
    return Array.from({
      length: 21
    }, (_, i) => addDays(today, i));
  }, []);
  const availableWeekdays = reactExports.useMemo(() => {
    if (!availQ.data) return [];
    return [...new Set(availQ.data.map((s) => s.weekday))];
  }, [availQ.data]);
  const selectedDateBookingsQ = useQuery({
    queryKey: ["booked-slots", profileQ.data?.id, selectedDate],
    queryFn: () => getBooked({
      data: {
        user_id: profileQ.data.id,
        date: selectedDate
      }
    }),
    enabled: !!profileQ.data && !!selectedDate
  });
  const slotsWithStatus = reactExports.useMemo(() => {
    if (!selectedDate || !availQ.data || !selectedEvent || !selectedDateBookingsQ.data) return [];
    const date = /* @__PURE__ */ new Date(selectedDate + "T00:00:00");
    const weekday = date.getDay();
    const daySlots = availQ.data.filter((s) => s.weekday === weekday);
    const duration = selectedEvent.duration_min;
    const bookedRanges = selectedDateBookingsQ.data.map((b) => ({
      start: new Date(b.start_at).getTime(),
      end: new Date(b.end_at).getTime()
    }));
    const result = [];
    for (const slot of daySlots) {
      const startH = parseInt(slot.start_time.slice(0, 2));
      const startM = parseInt(slot.start_time.slice(3, 5));
      const endH = parseInt(slot.end_time.slice(0, 2));
      const endM = parseInt(slot.end_time.slice(3, 5));
      const dayStart = new Date(date);
      dayStart.setHours(startH, startM, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(endH, endM, 0, 0);
      let cursor = dayStart.getTime();
      while (cursor + duration * 6e4 <= dayEnd.getTime()) {
        const slotEnd = cursor + duration * 6e4;
        const booked = bookedRanges.some((br) => cursor < br.end && slotEnd > br.start);
        result.push({
          time: format(new Date(cursor), "HH:mm"),
          booked
        });
        cursor += duration * 6e4;
      }
    }
    return result;
  }, [selectedDate, availQ.data, selectedEvent, selectedDateBookingsQ.data]);
  const handleConfirm = async () => {
    if (!selectedEvent || !selectedDate || !selectedTime) return;
    setSubmitting(true);
    const [h, m] = selectedTime.split(":").map(Number);
    const start = /* @__PURE__ */ new Date(selectedDate + "T00:00:00");
    start.setHours(h, m, 0, 0);
    const end = new Date(start.getTime() + selectedEvent.duration_min * 6e4);
    try {
      const result = await createB({
        data: {
          user_id: profileQ.data.id,
          event_type_id: selectedEvent.id,
          start_at: start.toISOString(),
          end_at: end.toISOString(),
          client_name: clientName,
          client_email: clientEmail,
          client_answers: answers
        }
      });
      setBookingResult(result);
      setStep("confirm");
      toast.success("Turno reservado con éxito");
    } catch (e) {
      toast.error(e.message ?? "Error al reservar");
    }
    setSubmitting(false);
  };
  if (profileQ.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }) });
  }
  const profile = profileQ.data;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-7 w-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: profile?.display_name ?? "Profesional" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: profile?.welcome_message })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-6", children: ["event", "datetime", "form", "confirm"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${step === s ? "bg-primary text-primary-foreground" : ["event", "datetime", "form", "confirm"].indexOf(step) > i ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`, children: ["event", "datetime", "form", "confirm"].indexOf(step) > i ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : i + 1 }),
      i < 3 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-8 bg-muted" })
    ] }, s)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-lg", children: [
      step === "event" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Seleccioná un tipo de turno" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Elegí el servicio que querés reservar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: eventsQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) }) : (eventsQ.data ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-8", children: "No hay eventos disponibles" }) : (eventsQ.data ?? []).map((et) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setSelectedEvent(et);
          setStep("datetime");
        }, className: "w-full text-left rounded-lg border p-4 hover:border-primary hover:bg-accent/50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0", style: {
            backgroundColor: et.color
          }, children: et.name.charAt(0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium truncate", children: et.name }),
            et.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: et.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
            et.duration_min,
            " min"
          ] })
        ] }) }, et.id)) })
      ] }),
      step === "datetime" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", onClick: () => setStep("event"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Elegí día y hora" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
              selectedEvent?.name,
              " · ",
              selectedEvent?.duration_min,
              " min"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-3", children: "Días disponibles" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 max-h-[320px] overflow-y-auto", children: weekDates.map((date) => {
                const wd = date.getDay();
                const disabled = !availableWeekdays.includes(wd);
                const dateStr = format(date, "yyyy-MM-dd");
                const isSelected = selectedDate === dateStr;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled, onClick: () => {
                  setSelectedDate(dateStr);
                  setSelectedTime(null);
                }, className: `w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${isSelected ? "bg-primary text-primary-foreground" : disabled ? "text-muted-foreground/40 cursor-not-allowed" : "hover:bg-accent"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: format(date, "EEE", {
                    locale: es
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: format(date, "d MMM", {
                    locale: es
                  }) })
                ] }, dateStr);
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-medium mb-3", children: [
                "Horarios ",
                selectedDate ? format(parseISO(selectedDate), "d 'de' MMMM", {
                  locale: es
                }) : ""
              ] }),
              !selectedDate ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Seleccioná un día" }) : selectedDateBookingsQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) }) : slotsWithStatus.filter((s) => !s.booked).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No hay horarios disponibles este día" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto", children: slotsWithStatus.map(({
                time,
                booked
              }) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: booked, onClick: () => !booked && setSelectedTime(time), className: `px-3 py-2 rounded-md text-sm border transition-colors ${booked ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed line-through" : selectedTime === time ? "border-primary bg-primary/10 text-primary font-medium" : "hover:border-primary hover:bg-accent"}`, children: time }, time)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full mt-6", disabled: !selectedTime, onClick: () => setStep("form"), children: [
            "Continuar ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-1 h-4 w-4" })
          ] })
        ] })
      ] }),
      step === "form" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", onClick: () => setStep("datetime"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Tus datos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
              selectedEvent?.name,
              " · ",
              selectedDate && format(parseISO(selectedDate), "d 'de' MMMM", {
                locale: es
              }),
              " a las ",
              selectedTime
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nombre completo *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: clientName, onChange: (e) => setClientName(e.target.value), placeholder: "Tu nombre" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: clientEmail, onChange: (e) => setClientEmail(e.target.value), placeholder: "tu@email.com" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          (selectedEvent?.event_questions ?? []).map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              q.label,
              q.required ? " *" : ""
            ] }),
            q.field_type === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: answers[q.id] ?? "", onChange: (e) => setAnswers({
              ...answers,
              [q.id]: e.target.value
            }) }),
            q.field_type === "textarea" && /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: answers[q.id] ?? "", onChange: (e) => setAnswers({
              ...answers,
              [q.id]: e.target.value
            }) }),
            q.field_type === "email" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: answers[q.id] ?? "", onChange: (e) => setAnswers({
              ...answers,
              [q.id]: e.target.value
            }) }),
            q.field_type === "phone" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "tel", value: answers[q.id] ?? "", onChange: (e) => setAnswers({
              ...answers,
              [q.id]: e.target.value
            }) }),
            q.field_type === "dropdown" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: answers[q.id] ?? "", onValueChange: (v) => setAnswers({
              ...answers,
              [q.id]: v
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Seleccionar..." }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (typeof q.options === "string" ? JSON.parse(q.options) : q.options ?? []).map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, children: opt }, opt)) })
            ] }),
            q.field_type === "radio" && /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroup, { value: answers[q.id] ?? "", onValueChange: (v) => setAnswers({
              ...answers,
              [q.id]: v
            }), children: (typeof q.options === "string" ? JSON.parse(q.options) : q.options ?? []).map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: opt, id: `${q.id}-${opt}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `${q.id}-${opt}`, className: "font-normal", children: opt })
            ] }, opt)) }),
            q.field_type === "checkbox" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (typeof q.options === "string" ? JSON.parse(q.options) : q.options ?? []).map((opt) => {
              const val = answers[q.id] ?? "";
              const checked = val.split(",").includes(opt);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: `${q.id}-${opt}`, checked, onCheckedChange: (c) => {
                  const current = val ? val.split(",") : [];
                  const next = c ? [...current, opt] : current.filter((x) => x !== opt);
                  setAnswers({
                    ...answers,
                    [q.id]: next.join(",")
                  });
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `${q.id}-${opt}`, className: "font-normal", children: opt })
              ] }, opt);
            }) })
          ] }, q.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", disabled: submitting || !clientName || !clientEmail, onClick: handleConfirm, children: [
            submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
            "Confirmar turno"
          ] })
        ] })
      ] }),
      step === "confirm" && /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-8 pb-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Turno confirmado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2 mb-6", children: [
          selectedEvent?.name,
          " · ",
          selectedDate && format(parseISO(selectedDate), "EEEE d 'de' MMMM", {
            locale: es
          }),
          " a las ",
          selectedTime
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-4 text-sm space-y-1 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cliente:" }),
            " ",
            clientName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email:" }),
            " ",
            clientEmail
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Te enviamos un email de confirmación a ",
          clientEmail
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-6", onClick: () => window.location.reload(), children: "Reservar otro turno" })
      ] })
    ] })
  ] }) });
}
export {
  BookPage as component
};
