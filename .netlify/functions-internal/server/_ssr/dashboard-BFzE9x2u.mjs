import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth } from "./router-DJfNjEB8.mjs";
import { s as supabase } from "./client-xQt6fTOx.mjs";
import { B as Button, I as Input, L as Label } from "./label-C0xBDsBE.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as cn } from "./card-DFdj6CNt.mjs";
import { T as Textarea, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ZagbfIAy.mjs";
import { S as Switch$1, a as SwitchThumb } from "../_libs/radix-ui__react-switch.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { D as Dialog, a as DialogTrigger, T as Table, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell, g as DialogContent, h as DialogHeader, i as DialogTitle, j as DialogFooter } from "./dialog-Bi-Wcj32.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { u as useServerFn, c as createSsrRpc } from "./useServerFn-CIY9_c2w.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as createServerFn } from "./server-Bvv6hkd8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DjqZhiQe.mjs";
import { d as disconnectGoogle, g as getGoogleAuthUrl, c as checkGoogleConnection } from "./google.functions-Czogz0ra.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { a as Calendar, c as Clock, e as ChevronRight, S as Sun, P as Plus, L as LoaderCircle, T as Trash2, j as Link, k as CircleX, b as CircleCheck, l as LogOut } from "../_libs/lucide-react.mjs";
import { f as format, e as es } from "../_libs/date-fns.mjs";
import { o as objectType, s as stringType, n as numberType, b as booleanType, a as arrayType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const listEventTypes = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d1b474b4a57b2c6c989bb19c75103162044641efb5ac4565f89d040237754255"));
const createEventType = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  name: stringType().min(1).max(200),
  description: stringType().max(500).optional(),
  duration_min: numberType().min(5).max(480),
  color: stringType().optional(),
  location: stringType().max(200).optional()
}).parse(d)).handler(createSsrRpc("f423faf74664d3cbf62e656316f2fccc6a389952862b6a21a9ac037fb059a24a"));
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
}).parse(d)).handler(createSsrRpc("173892e1b5fe2831b52872f35c44e4d3161478a643bf875adfbe625afb0294de"));
const deleteEventType = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("eba23e6386c6193fb2e803dd555759c04497be0e754256b0c923b6feed750cdf"));
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
}).parse(d)).handler(createSsrRpc("7a0bb74e960c5cf78dd9da1f9c979702588e7aa300fe73cc2e617a75dd8c25e5"));
const getAvailability = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("0dcfda8170a167fd57a8aeeadbe0dd404cf28be38be865788869518a6df2302c"));
const saveAvailability = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  slots: arrayType(objectType({
    weekday: numberType().min(0).max(6),
    start_time: stringType().regex(/^\d{2}:\d{2}$/),
    end_time: stringType().regex(/^\d{2}:\d{2}$/)
  }))
}).parse(d)).handler(createSsrRpc("5c00dbca2b7089f74839d8b981765192c65336077763546e29d61a8e485b2ffc"));
const listBookings = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("2b9481384f4d67eb22e40eae59acd81f939162e75bd11d6264e5e4ae608f454b"));
const cancelBooking = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("68f916ba9ede0f27abab1fb23b50b234805abd1ae48e61b321f3400073b58d94"));
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Switch$1,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchThumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Switch$1.displayName;
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const FIELD_TYPES = [{
  value: "text",
  label: "Texto corto"
}, {
  value: "textarea",
  label: "Texto largo"
}, {
  value: "email",
  label: "Email"
}, {
  value: "phone",
  label: "Teléfono"
}, {
  value: "dropdown",
  label: "Desplegable"
}, {
  value: "checkbox",
  label: "Checkbox"
}, {
  value: "radio",
  label: "Radio button"
}];
function DashboardPage() {
  const {
    signOut,
    user,
    role
  } = useAuth();
  const listET = useServerFn(listEventTypes);
  const createET = useServerFn(createEventType);
  const updateET = useServerFn(updateEventType);
  const deleteET = useServerFn(deleteEventType);
  const saveQ = useServerFn(saveEventQuestions);
  const getAvail = useServerFn(getAvailability);
  const saveAvail = useServerFn(saveAvailability);
  const listB = useServerFn(listBookings);
  const cancelB = useServerFn(cancelBooking);
  const getGAuthUrl = useServerFn(getGoogleAuthUrl);
  const checkGConn = useServerFn(checkGoogleConnection);
  const disconnectG = useServerFn(disconnectGoogle);
  const qc = useQueryClient();
  const [tab, setTab] = reactExports.useState("events");
  const profileQ = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("profiles").select("slug").eq("id", user?.id).single();
      return data;
    },
    enabled: !!user?.id
  });
  const etQ = useQuery({
    queryKey: ["event-types"],
    queryFn: () => listET()
  });
  const availQ = useQuery({
    queryKey: ["availability"],
    queryFn: () => getAvail()
  });
  const bookingsQ = useQuery({
    queryKey: ["bookings"],
    queryFn: () => listB()
  });
  const googleQ = useQuery({
    queryKey: ["google-calendar"],
    queryFn: () => checkGConn()
  });
  const [showNewEvent, setShowNewEvent] = reactExports.useState(false);
  const [editEventData, setEditEventData] = reactExports.useState(null);
  const [availConfig, setAvailConfig] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (availQ.data) {
      const config = {};
      for (let d = 0; d < 7; d++) {
        const daySlots = availQ.data.filter((s) => s.weekday === d);
        config[d] = daySlots.length > 0 ? daySlots.map((s) => ({
          enabled: true,
          start: s.start_time.slice(0, 5),
          end: s.end_time.slice(0, 5)
        })) : [{
          enabled: false,
          start: "09:00",
          end: "17:00"
        }];
      }
      setAvailConfig(config);
    }
  }, [availQ.data]);
  const createMut = useMutation({
    mutationFn: (v) => createET({
      data: v
    }),
    onSuccess: () => {
      toast.success("Evento creado");
      setShowNewEvent(false);
      qc.invalidateQueries({
        queryKey: ["event-types"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const updateMut = useMutation({
    mutationFn: (v) => updateET({
      data: v
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["event-types"]
      });
      toast.success("Evento actualizado");
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteMut = useMutation({
    mutationFn: (id) => deleteET({
      data: {
        id
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["event-types"]
      });
      toast.success("Evento eliminado");
    },
    onError: (e) => toast.error(e.message)
  });
  const saveQmut = useMutation({
    mutationFn: (v) => saveQ({
      data: v
    }),
    onSuccess: () => {
      toast.success("Preguntas guardadas");
    },
    onError: (e) => toast.error(e.message)
  });
  const saveAvailMut = useMutation({
    mutationFn: () => {
      const slots = [];
      for (const [day, blocks] of Object.entries(availConfig)) {
        for (const block of blocks) {
          if (block.enabled) {
            slots.push({
              weekday: Number(day),
              start_time: block.start,
              end_time: block.end
            });
          }
        }
      }
      return saveAvail({
        data: {
          slots
        }
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["availability"]
      });
      toast.success("Disponibilidad guardada");
    },
    onError: (e) => toast.error(e.message)
  });
  const cancelMut = useMutation({
    mutationFn: (id) => cancelB({
      data: {
        id
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["bookings"]
      });
      toast.success("Reserva cancelada");
    },
    onError: (e) => toast.error(e.message)
  });
  const handleSaveEventWithQuestions = async (eventId, questions) => {
    if (questions.length > 0) {
      await saveQmut.mutateAsync({
        event_type_id: eventId,
        questions
      });
    }
    qc.invalidateQueries({
      queryKey: ["event-types"]
    });
    setEditEventData(null);
    toast.success("Evento actualizado");
  };
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent", children: "Mi Agenda" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        user?.email && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-500 hidden sm:inline", children: user.email }),
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => window.location.href = "/admin", children: "Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: signOut, className: "border-slate-200", children: "Salir" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-6xl px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: tab, onValueChange: setTab, className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/60 p-1.5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "w-full justify-start gap-1 bg-transparent p-0", children: [{
        value: "events",
        label: "Tipos de evento",
        icon: Calendar
      }, {
        value: "availability",
        label: "Disponibilidad",
        icon: Clock
      }, {
        value: "bookings",
        label: "Reservas",
        icon: ChevronRight
      }, {
        value: "calendar",
        label: "Google Calendar",
        icon: Sun
      }].map(({
        value,
        label,
        icon: Icon
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value, className: "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-slate-700 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        " ",
        label
      ] }, value)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "events", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-slate-900", children: "Tipos de evento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Creá los servicios que tus clientes pueden reservar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: showNewEvent, onOpenChange: setShowNewEvent, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
              " Nuevo evento"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(NewEventDialog, { onSubmit: (v) => createMut.mutate(v), loading: createMut.isPending })
          ] })
        ] }),
        etQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-blue-500" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: [
          (etQ.data ?? []).map((et) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group relative overflow-hidden border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200", style: {
            background: `linear-gradient(135deg, white 0%, ${et.color}08 100%)`
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 h-1.5 w-full", style: {
              background: `linear-gradient(90deg, ${et.color}, ${et.color}88)`
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl text-white text-sm font-bold shadow-sm", style: {
                  background: `linear-gradient(135deg, ${et.color}, ${et.color}cc)`
                }, children: et.name.charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base text-slate-900", children: et.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "text-xs", children: [
                    et.duration_min,
                    " min · ",
                    et.is_active ? "Activo" : "Inactivo"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50", onClick: () => setEditEventData({
                  event: et,
                  questions: (et.event_questions ?? []).map((q) => ({
                    ...q,
                    options: Array.isArray(q.options) ? q.options : []
                  }))
                }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "h-4 w-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50", onClick: () => {
                  if (confirm("¿Eliminar este evento?")) deleteMut.mutate(et.id);
                }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0 space-y-3", children: [
              et.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 line-clamp-2", children: et.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400", children: [
                  et.event_questions?.length ?? 0,
                  " campos en el formulario"
                ] }),
                et.is_active && profileQ.data?.slug && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                  navigator.clipboard.writeText(`${origin}/book/${profileQ.data.slug}`);
                  toast.success("Link copiado");
                }, className: "flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "h-3 w-3" }),
                  " Copiar link"
                ] })
              ] })
            ] })
          ] }, et.id)),
          (etQ.data ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full flex flex-col items-center justify-center py-20 text-slate-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-12 w-12 mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No hay tipos de evento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Creá el primero para empezar" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editEventData, onOpenChange: (o) => {
          if (!o) {
            setEditEventData(null);
            qc.invalidateQueries({
              queryKey: ["event-types"]
            });
          }
        }, children: editEventData && /* @__PURE__ */ jsxRuntimeExports.jsx(EditEventDialog, { event: editEventData.event, questions: editEventData.questions, onSaveEvent: (v) => updateMut.mutateAsync({
          id: editEventData.event.id,
          ...v
        }), onSaveQuestions: (qs) => handleSaveEventWithQuestions(editEventData.event.id, qs), loading: updateMut.isPending || saveQmut.isPending }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "availability", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-slate-900", children: "Disponibilidad semanal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Configurá los horarios disponibles para cada día" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 bg-white shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-3", children: [
          [0, 1, 2, 3, 4, 5, 6].map((day) => {
            const blocks = availConfig[day] ?? [{
              enabled: false,
              start: "09:00",
              end: "17:00"
            }];
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-slate-100 bg-slate-50/50 p-4 hover:border-slate-200 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-[140px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: blocks.some((b) => b.enabled), onCheckedChange: (checked) => {
                  setAvailConfig((prev) => ({
                    ...prev,
                    [day]: checked ? [{
                      enabled: true,
                      start: "09:00",
                      end: "17:00"
                    }] : [{
                      enabled: false,
                      start: "09:00",
                      end: "17:00"
                    }]
                  }));
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium text-sm ${blocks.some((b) => b.enabled) ? "text-slate-900" : "text-slate-400"}`, children: DAYS[day] })
              ] }),
              blocks.map((block, bi) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: block.enabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: block.start, onChange: (e) => {
                  const newConfig = {
                    ...availConfig
                  };
                  newConfig[day] = [...newConfig[day] ?? []];
                  newConfig[day][bi] = {
                    ...newConfig[day][bi],
                    start: e.target.value
                  };
                  setAvailConfig(newConfig);
                }, className: "w-28 h-9 text-sm border-slate-200" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-sm", children: "a" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: block.end, onChange: (e) => {
                  const newConfig = {
                    ...availConfig
                  };
                  newConfig[day] = [...newConfig[day] ?? []];
                  newConfig[day][bi] = {
                    ...newConfig[day][bi],
                    end: e.target.value
                  };
                  setAvailConfig(newConfig);
                }, className: "w-28 h-9 text-sm border-slate-200" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-slate-400 hover:text-red-500", onClick: () => {
                  const newConfig = {
                    ...availConfig
                  };
                  newConfig[day] = newConfig[day].filter((_, i) => i !== bi);
                  if (newConfig[day].length === 0) newConfig[day] = [{
                    enabled: false,
                    start: "09:00",
                    end: "17:00"
                  }];
                  setAvailConfig(newConfig);
                }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" }) })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-400 italic", children: "No disponible" }) }, bi)),
              blocks.some((b) => b.enabled) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", className: "h-8 text-xs text-blue-600 hover:text-blue-700", onClick: () => {
                const newConfig = {
                  ...availConfig
                };
                newConfig[day] = [...newConfig[day] ?? [], {
                  enabled: true,
                  start: "09:00",
                  end: "17:00"
                }];
                setAvailConfig(newConfig);
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3 mr-1" }),
                " Agregar"
              ] })
            ] }) }, day);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => saveAvailMut.mutate(), disabled: saveAvailMut.isPending, className: "w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all h-11", children: [
            saveAvailMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
            "Guardar disponibilidad"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "bookings", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-slate-900", children: "Reservas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Turnos recibidos de tus clientes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 bg-white shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: bookingsQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-blue-500" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-slate-500 uppercase", children: "Cliente" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-slate-500 uppercase", children: "Evento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-slate-500 uppercase", children: "Fecha y hora" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-slate-500 uppercase", children: "Estado" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right text-xs font-semibold text-slate-500 uppercase", children: "Acción" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
            (bookingsQ.data ?? []).map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-slate-100 hover:bg-slate-50/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-slate-900", children: b.client_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400", children: b.client_email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-slate-700", children: b.event_types?.name ?? "-" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-slate-700", children: format(new Date(b.start_at), "PPPp", {
                locale: es
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: b.status === "confirmed" ? "default" : "destructive", className: `text-xs ${b.status === "confirmed" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`, children: b.status === "confirmed" ? "Confirmada" : "Cancelada" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: b.status === "confirmed" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "text-red-600 border-red-200 hover:bg-red-50 text-xs", onClick: () => {
                if (confirm("¿Cancelar esta reserva?")) cancelMut.mutate(b.id);
              }, children: "Cancelar" }) })
            ] }, b.id)),
            (bookingsQ.data ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-center text-sm text-slate-400 py-12", children: "No hay reservas todavía" }) })
          ] })
        ] }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "calendar", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-slate-900", children: "Google Calendar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Sincronizá tus turnos con Google Calendar" })
        ] }),
        googleQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-blue-500" }) }) : googleQ.data?.connected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 bg-white shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-green-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6 text-green-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-green-800", children: "Google Calendar conectado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-green-600", children: googleQ.data.email })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Los nuevos turnos se crearán automáticamente en tu calendario." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "text-red-600 border-red-200 hover:bg-red-50", onClick: async () => {
            await disconnectG();
            googleQ.refetch();
            toast.success("Google Calendar desconectado");
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }),
            " Desconectar"
          ] })
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 bg-white shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border-2 border-dashed border-slate-200 p-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-8 w-8 text-slate-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-slate-700", children: "Google Calendar no conectado" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 mt-1", children: "Conectá tu cuenta para sincronizar los turnos automáticamente" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all h-11", onClick: async () => {
            try {
              const url = await getGAuthUrl();
              window.location.href = url;
            } catch (e) {
              toast.error(e.message ?? "Error al conectar Google Calendar");
            }
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mr-2 h-4 w-4" }),
            " Conectar Google Calendar"
          ] })
        ] }) })
      ] })
    ] }) })
  ] });
}
function NewEventDialog({
  onSubmit,
  loading
}) {
  const [name, setName] = reactExports.useState("");
  const [desc, setDesc] = reactExports.useState("");
  const [duration, setDuration] = reactExports.useState("30");
  const [color, setColor] = reactExports.useState("#3b82f6");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-lg text-slate-900", children: "Nuevo tipo de evento" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-slate-700", children: "Nombre del evento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Ej: Consulta general", className: "mt-1.5 border-slate-200" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-slate-700", children: "Descripción" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: desc, onChange: (e) => setDesc(e.target.value), placeholder: "Describí brevemente este servicio", className: "mt-1.5 border-slate-200", rows: 3 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-slate-700", children: "Duración" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: duration, onValueChange: setDuration, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1.5 border-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [15, 30, 45, 60, 90, 120].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(m), children: [
            m,
            " minutos"
          ] }, m)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-slate-700", children: "Color" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "color", value: color, onChange: (e) => setColor(e.target.value), className: "mt-1.5 h-10 p-1 border-slate-200" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: loading || !name, onClick: () => onSubmit({
      name,
      description: desc,
      duration_min: Number(duration),
      color
    }), className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md", children: [
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
      "Crear evento"
    ] }) })
  ] });
}
function EditEventDialog({
  event,
  questions,
  onSaveEvent,
  onSaveQuestions,
  loading
}) {
  const [name, setName] = reactExports.useState(event.name);
  const [active, setActive] = reactExports.useState(event.is_active);
  const [qs, setQs] = reactExports.useState(questions.length > 0 ? questions : []);
  const addQuestion = () => setQs([...qs, {
    label: "",
    field_type: "text",
    options: [],
    required: false,
    order_idx: qs.length
  }]);
  const updQ = (i, f, v) => {
    const copy = [...qs];
    copy[i][f] = v;
    setQs(copy);
  };
  const delQ = (i) => setQs(qs.filter((_, j) => j !== i));
  const addOption = (qi) => {
    const copy = [...qs];
    copy[qi].options = [...copy[qi].options ?? [], ""];
    setQs(copy);
  };
  const updOption = (qi, oi, val) => {
    const copy = [...qs];
    copy[qi].options[oi] = val;
    setQs(copy);
  };
  const delOption = (qi, oi) => {
    const copy = [...qs];
    copy[qi].options = copy[qi].options.filter((_, j) => j !== oi);
    setQs(copy);
  };
  const handleSave = async () => {
    await onSaveEvent({
      name,
      is_active: active
    });
    await onSaveQuestions(qs);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-lg text-slate-900", children: "Editar evento" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 pb-4 border-b border-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-slate-700", children: "Nombre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), className: "mt-1.5 border-slate-200" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: active, onCheckedChange: setActive }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-slate-600", children: "Activo" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-slate-700", children: "Campos del formulario" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: addQuestion, className: "text-xs border-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3 mr-1" }),
          " Agregar campo"
        ] })
      ] }),
      qs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-xl", children: "No hay campos personalizados. Agregá uno para que los clientes completen datos." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: qs.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider", children: [
            "Campo ",
            i + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7 text-slate-400 hover:text-red-500 hover:bg-red-50", onClick: () => delQ(i), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Ej: ¿Cuál es tu motivo de consulta?", value: q.label, onChange: (e) => updQ(i, "label", e.target.value), className: "border-slate-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: q.field_type, onValueChange: (v) => updQ(i, "field_type", v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "flex-1 border-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FIELD_TYPES.map((ft) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ft.value, children: ft.label }, ft.value)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: q.required, onCheckedChange: (v) => updQ(i, "required", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-slate-500", children: "Obligatorio" })
          ] })
        ] }),
        ["dropdown", "radio", "checkbox"].includes(q.field_type) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pl-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-slate-500", children: "Opciones" }),
          (q.options ?? []).map((opt, oi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-xs text-slate-400 shrink-0", children: oi + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: opt, onChange: (e) => updOption(i, oi, e.target.value), placeholder: `Opción ${oi + 1}`, className: "flex-1 border-slate-200 h-9 text-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-slate-400 hover:text-red-500 shrink-0", onClick: () => delOption(i, oi), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" }) })
          ] }, oi)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: () => addOption(i), className: "text-blue-600 hover:text-blue-700 text-xs h-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3 mr-1" }),
            " Agregar opción"
          ] })
        ] })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { className: "mt-6 pt-4 border-t border-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: loading || !name, onClick: handleSave, className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md", children: [
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
      "Guardar cambios"
    ] }) })
  ] });
}
export {
  DashboardPage as component
};
