import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { exchangeGoogleCode, saveGoogleToken } from "@/lib/google.functions";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/api/auth/google/callback")({
  ssr: false,
  component: GoogleCallbackPage,
});

function GoogleCallbackPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const exchange = useServerFn(exchangeGoogleCode);
  const saveToken = useServerFn(saveGoogleToken);
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const code = (search as any).code;
    const error = (search as any).error;
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

    exchange({ data: { code } })
      .then((tokens) => saveToken({ data: { refresh_token: tokens.refresh_token, access_token: tokens.access_token } }))
      .then(() => setStatus("success"))
      .catch((e) => { setStatus("error"); setErrorMsg(e.message ?? "Error al conectar"); });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center max-w-sm mx-4">
        {status === "processing" && (
          <>
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">Conectando Google Calendar...</p>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />
            <h2 className="mt-4 text-lg font-semibold">Google Calendar conectado</h2>
            <p className="text-sm text-muted-foreground mt-1">Tus turnos se sincronizarán automáticamente.</p>
            <button
              onClick={() => navigate({ to: "/dashboard", search: { tab: "calendar" } as any })}
              className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Volver al dashboard
            </button>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="mx-auto h-10 w-10 text-destructive" />
            <h2 className="mt-4 text-lg font-semibold">Error al conectar</h2>
            <p className="text-sm text-muted-foreground mt-1">{errorMsg}</p>
            <button
              onClick={() => navigate({ to: "/dashboard", search: { tab: "calendar" } as any })}
              className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Volver al dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}
