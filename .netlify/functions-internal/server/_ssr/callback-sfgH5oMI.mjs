import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-CIY9_c2w.mjs";
import { e as exchangeGoogleCode, s as saveGoogleToken } from "./google.functions-Czogz0ra.mjs";
import { a as Route } from "./router-DJfNjEB8.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { L as LoaderCircle, b as CircleCheck, k as CircleX } from "../_libs/lucide-react.mjs";
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
import "./server-Bvv6hkd8.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-DjqZhiQe.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-xQt6fTOx.mjs";
function GoogleCallbackPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const exchange = useServerFn(exchangeGoogleCode);
  const saveToken = useServerFn(saveGoogleToken);
  const [status, setStatus] = reactExports.useState("processing");
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  reactExports.useEffect(() => {
    const code = search.code;
    const error = search.error;
    if (error) {
      setStatus("error");
      setErrorMsg("El usuario canceló la autorización");
      return;
    }
    if (!code) {
      setStatus("error");
      setErrorMsg("No se recibió el código de autorización");
      return;
    }
    exchange({
      data: {
        code
      }
    }).then((tokens) => saveToken({
      data: {
        refresh_token: tokens.refresh_token,
        access_token: tokens.access_token
      }
    })).then(() => setStatus("success")).catch((e) => {
      setStatus("error");
      setErrorMsg(e.message ?? "Error al conectar");
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm mx-4", children: [
    status === "processing" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-10 w-10 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Conectando Google Calendar..." })
    ] }),
    status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-10 w-10 text-green-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-lg font-semibold", children: "Google Calendar conectado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Tus turnos se sincronizarán automáticamente." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/dashboard",
        search: {
          tab: "calendar"
        }
      }), className: "mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "Volver al dashboard" })
    ] }),
    status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mx-auto h-10 w-10 text-destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-lg font-semibold", children: "Error al conectar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: errorMsg }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/dashboard",
        search: {
          tab: "calendar"
        }
      }), className: "mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "Volver al dashboard" })
    ] })
  ] }) });
}
export {
  GoogleCallbackPage as component
};
