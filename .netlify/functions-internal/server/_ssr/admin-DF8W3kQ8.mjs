import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-DJfNjEB8.mjs";
import { B as Button, L as Label, I as Input } from "./label-C0xBDsBE.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DFdj6CNt.mjs";
import { D as Dialog, a as DialogTrigger, T as Table, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell, g as DialogContent, h as DialogHeader, i as DialogTitle, j as DialogFooter } from "./dialog-Bi-Wcj32.mjs";
import { u as useServerFn, c as createSsrRpc } from "./useServerFn-CIY9_c2w.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as createServerFn } from "./server-Bvv6hkd8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DjqZhiQe.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { P as Plus, L as LoaderCircle, m as Copy, n as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "./client-xQt6fTOx.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const listUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab"));
const createUserAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  email: stringType().email(),
  password: stringType().min(8).max(128),
  internal_name: stringType().min(1).max(120),
  display_name: stringType().min(1).max(120)
}).parse(d)).handler(createSsrRpc("9f4cccad096f8a3353ec88a2b7e2de3316155b18cc0a12d4decd2198c0b7bd40"));
const updateUserAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  internal_name: stringType().min(1).max(120).optional(),
  display_name: stringType().min(1).max(120).optional(),
  password: stringType().min(8).max(128).optional(),
  email: stringType().email().optional()
}).parse(d)).handler(createSsrRpc("aded4ec668020aef62002ba750961a94129000fc727d392e8717b0cb89ec03a7"));
const deleteUserAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("11b8f7e30db9be9bcaabba5794d8d62f3956f1e9408af54c072dc998a1895b17"));
function AdminPage() {
  const {
    role,
    signOut,
    user,
    loading
  } = useAuth();
  const list = useServerFn(listUsers);
  const create = useServerFn(createUserAccount);
  const update = useServerFn(updateUserAccount);
  const remove = useServerFn(deleteUserAccount);
  const qc = useQueryClient();
  const [openCreate, setOpenCreate] = reactExports.useState(false);
  const [editUser, setEditUser] = reactExports.useState(null);
  const usersQ = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => list(),
    enabled: role === "admin"
  });
  const createM = useMutation({
    mutationFn: (vars) => create({
      data: vars
    }),
    onSuccess: () => {
      toast.success("Usuario creado");
      setOpenCreate(false);
      qc.invalidateQueries({
        queryKey: ["admin-users"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const updateM = useMutation({
    mutationFn: (vars) => update({
      data: vars
    }),
    onSuccess: () => {
      toast.success("Usuario actualizado");
      setEditUser(null);
      qc.invalidateQueries({
        queryKey: ["admin-users"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteM = useMutation({
    mutationFn: (id) => remove({
      data: {
        id
      }
    }),
    onSuccess: () => {
      toast.success("Usuario eliminado");
      qc.invalidateQueries({
        queryKey: ["admin-users"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (loading) return null;
  if (role && role !== "admin") return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard", replace: true });
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-50 p-4 md:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Panel de Administración" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: user?.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: signOut, children: "Cerrar sesión" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Usuarios profesionales" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: openCreate, onOpenChange: setOpenCreate, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
              " Nuevo usuario"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreateUserDialog, { onSubmit: (v) => createM.mutate(v), loading: createM.isPending })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: usersQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nombre interno" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nombre público" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "URL pública" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Acciones" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
            (usersQ.data ?? []).map((u) => {
              const url = `${origin}/book/${u.slug}`;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: u.internal_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: u.display_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: u.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-xs text-blue-600 underline inline-flex items-center gap-1", onClick: () => {
                  navigator.clipboard.writeText(url);
                  toast.success("URL copiada");
                }, children: [
                  "/book/",
                  u.slug,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setEditUser(u), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "destructive", onClick: () => {
                    if (confirm(`¿Eliminar a ${u.internal_name}? Esta acción no se puede deshacer.`)) {
                      deleteM.mutate(u.id);
                    }
                  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
                ] })
              ] }, u.id);
            }),
            usersQ.data && usersQ.data.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-center text-sm text-muted-foreground py-8", children: "No hay usuarios todavía. Creá el primero." }) })
          ] })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editUser, onOpenChange: (o) => !o && setEditUser(null), children: editUser && /* @__PURE__ */ jsxRuntimeExports.jsx(EditUserDialog, { user: editUser, onSubmit: (v) => updateM.mutate({
      id: editUser.id,
      ...v
    }), loading: updateM.isPending }) })
  ] });
}
function CreateUserDialog({
  onSubmit,
  loading
}) {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [internalName, setInternalName] = reactExports.useState("");
  const [displayName, setDisplayName] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Crear usuario profesional" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nombre interno (solo lo ves vos)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: internalName, onChange: (e) => setInternalName(e.target.value), placeholder: "Ej: Dr. Pérez - clínica norte" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nombre público (lo ven los clientes)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: displayName, onChange: (e) => setDisplayName(e.target.value), placeholder: "Ej: Dr. Juan Pérez" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email de inicio de sesión" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Contraseña inicial" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "text", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "mín. 8 caracteres" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: loading || !email || password.length < 8 || !internalName || !displayName, onClick: () => onSubmit({
      email,
      password,
      internal_name: internalName,
      display_name: displayName
    }), children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Crear" }) })
  ] });
}
function EditUserDialog({
  user,
  onSubmit,
  loading
}) {
  const [internalName, setInternalName] = reactExports.useState(user.internal_name);
  const [displayName, setDisplayName] = reactExports.useState(user.display_name);
  const [email, setEmail] = reactExports.useState(user.email);
  const [password, setPassword] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Editar usuario" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nombre interno" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: internalName, onChange: (e) => setInternalName(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nombre público" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: displayName, onChange: (e) => setDisplayName(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nueva contraseña (vacío = sin cambio)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "text", value: password, onChange: (e) => setPassword(e.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: loading, onClick: () => onSubmit({
      internal_name: internalName !== user.internal_name ? internalName : void 0,
      display_name: displayName !== user.display_name ? displayName : void 0,
      email: email !== user.email ? email : void 0,
      password: password.length >= 8 ? password : void 0
    }), children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Guardar" }) })
  ] });
}
export {
  AdminPage as component
};
