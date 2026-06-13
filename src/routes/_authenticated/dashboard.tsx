import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listEventTypes, createEventType, updateEventType, deleteEventType, saveEventQuestions, getAvailability, saveAvailability, listBookings, cancelBooking } from "@/lib/user.functions";
import { getGoogleAuthUrl, checkGoogleConnection, disconnectGoogle } from "@/lib/google.functions";
import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Calendar, Clock, Link, CheckCircle2, XCircle, LogOut, Sun, Moon, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const FIELD_TYPES = [
  { value: "text", label: "Texto corto" },
  { value: "textarea", label: "Texto largo" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Teléfono" },
  { value: "dropdown", label: "Desplegable" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio button" },
];

type QuestionDef = { id?: string; label: string; field_type: string; options: string[]; required: boolean; order_idx: number };
type EventTypeRow = {
  id: string; name: string; slug: string; description: string | null; duration_min: number;
  color: string; location: string | null; is_active: boolean; event_questions?: any[];
};

function DashboardPage() {
  const { signOut, user, role } = useAuth();
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

  const [tab, setTab] = useState("events");
  const profileQ = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("slug").eq("id", user?.id).single();
      return data;
    },
    enabled: !!user?.id,
  });

  const etQ = useQuery({ queryKey: ["event-types"], queryFn: () => listET() });
  const availQ = useQuery({ queryKey: ["availability"], queryFn: () => getAvail() });
  const bookingsQ = useQuery({ queryKey: ["bookings"], queryFn: () => listB() });
  const googleQ = useQuery({ queryKey: ["google-calendar"], queryFn: () => checkGConn() });

  const [showNewEvent, setShowNewEvent] = useState(false);
  const [editEventData, setEditEventData] = useState<{ event: EventTypeRow; questions: QuestionDef[] } | null>(null);

  const [availConfig, setAvailConfig] = useState<Record<number, { enabled: boolean; start: string; end: string }[]>>({});

  useEffect(() => {
    if (availQ.data) {
      const config: Record<number, { enabled: boolean; start: string; end: string }[]> = {};
      for (let d = 0; d < 7; d++) {
        const daySlots = availQ.data.filter((s: any) => s.weekday === d);
        config[d] = daySlots.length > 0
          ? daySlots.map((s: any) => ({ enabled: true, start: s.start_time.slice(0, 5), end: s.end_time.slice(0, 5) }))
          : [{ enabled: false, start: "09:00", end: "17:00" }];
      }
      setAvailConfig(config);
    }
  }, [availQ.data]);

  const createMut = useMutation({
    mutationFn: (v: { name: string; description?: string; duration_min: number; color?: string }) => createET({ data: v }),
    onSuccess: () => { toast.success("Evento creado"); setShowNewEvent(false); qc.invalidateQueries({ queryKey: ["event-types"] }); },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMut = useMutation({
    mutationFn: (v: { id: string; name?: string; is_active?: boolean }) => updateET({ data: v }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["event-types"] }); toast.success("Evento actualizado"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteET({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["event-types"] }); toast.success("Evento eliminado"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveQmut = useMutation({
    mutationFn: (v: { event_type_id: string; questions: QuestionDef[] }) => saveQ({ data: v }),
    onSuccess: () => { toast.success("Preguntas guardadas"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveAvailMut = useMutation({
    mutationFn: () => {
      const slots: { weekday: number; start_time: string; end_time: string }[] = [];
      for (const [day, blocks] of Object.entries(availConfig)) {
        for (const block of blocks) {
          if (block.enabled) {
            slots.push({ weekday: Number(day), start_time: block.start, end_time: block.end });
          }
        }
      }
      return saveAvail({ data: { slots } });
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["availability"] }); toast.success("Disponibilidad guardada"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const cancelMut = useMutation({
    mutationFn: (id: string) => cancelB({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["bookings"] }); toast.success("Reserva cancelada"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const handleSaveEventWithQuestions = async (eventId: string, questions: QuestionDef[]) => {
    if (questions.length > 0) {
      await saveQmut.mutateAsync({ event_type_id: eventId, questions });
    }
    qc.invalidateQueries({ queryKey: ["event-types"] });
    setEditEventData(null);
    toast.success("Evento actualizado");
  };

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Mi Agenda</h1>
          </div>
          <div className="flex items-center gap-3">
            {user?.email && <span className="text-sm text-slate-500 hidden sm:inline">{user.email}</span>}
            {role === "admin" && (
              <Button variant="ghost" size="sm" onClick={() => window.location.href = "/admin"}>
                Admin
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={signOut} className="border-slate-200">Salir</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Tabs value={tab} onValueChange={setTab} className="space-y-8">
          <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/60 p-1.5 shadow-sm">
            <TabsList className="w-full justify-start gap-1 bg-transparent p-0">
              {[
                { value: "events", label: "Tipos de evento", icon: Calendar },
                { value: "availability", label: "Disponibilidad", icon: Clock },
                { value: "bookings", label: "Reservas", icon: ChevronRight },
                { value: "calendar", label: "Google Calendar", icon: Sun },
              ].map(({ value, label, icon: Icon }) => (
                <TabsTrigger key={value} value={value}
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-slate-700 transition-all">
                  <Icon className="h-4 w-4" /> {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* TAB: Event Types */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Tipos de evento</h2>
                <p className="text-sm text-slate-500">Creá los servicios que tus clientes pueden reservar</p>
              </div>
              <Dialog open={showNewEvent} onOpenChange={setShowNewEvent}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo evento
                  </Button>
                </DialogTrigger>
                <NewEventDialog onSubmit={(v) => createMut.mutate(v)} loading={createMut.isPending} />
              </Dialog>
            </div>

            {etQ.isLoading ? (
              <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {(etQ.data ?? []).map((et: EventTypeRow) => (
                  <Card key={et.id}
                    className="group relative overflow-hidden border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200"
                    style={{ background: `linear-gradient(135deg, white 0%, ${et.color}08 100%)` }}>
                    <div className="absolute top-0 left-0 h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${et.color}, ${et.color}88)` }} />
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white text-sm font-bold shadow-sm"
                            style={{ background: `linear-gradient(135deg, ${et.color}, ${et.color}cc)` }}>
                            {et.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <CardTitle className="text-base text-slate-900">{et.name}</CardTitle>
                            <CardDescription className="text-xs">{et.duration_min} min &middot; {et.is_active ? "Activo" : "Inactivo"}</CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => setEditEventData({ event: et, questions: (et.event_questions ?? []).map((q: any) => ({ ...q, options: Array.isArray(q.options) ? q.options : [] })) })}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => { if (confirm("¿Eliminar este evento?")) deleteMut.mutate(et.id); }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      {et.description && <p className="text-sm text-slate-500 line-clamp-2">{et.description}</p>}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">{et.event_questions?.length ?? 0} campos en el formulario</span>
                        {et.is_active && profileQ.data?.slug && (
                          <button onClick={() => { navigator.clipboard.writeText(`${origin}/book/${profileQ.data.slug}`); toast.success("Link copiado"); }}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                            <Link className="h-3 w-3" /> Copiar link
                          </button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {(etQ.data ?? []).length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
                    <Calendar className="h-12 w-12 mb-3" />
                    <p className="font-medium">No hay tipos de evento</p>
                    <p className="text-sm">Creá el primero para empezar</p>
                  </div>
                )}
              </div>
            )}

            <Dialog open={!!editEventData} onOpenChange={(o) => { if (!o) { setEditEventData(null); qc.invalidateQueries({ queryKey: ["event-types"] }); } }}>
              {editEventData && (
                <EditEventDialog
                  event={editEventData.event}
                  questions={editEventData.questions}
                  onSaveEvent={(v) => updateMut.mutateAsync({ id: editEventData.event.id, ...v })}
                  onSaveQuestions={(qs) => handleSaveEventWithQuestions(editEventData.event.id, qs)}
                  loading={updateMut.isPending || saveQmut.isPending}
                />
              )}
            </Dialog>
          </TabsContent>

          {/* TAB: Availability */}
          <TabsContent value="availability" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Disponibilidad semanal</h2>
              <p className="text-sm text-slate-500">Configurá los horarios disponibles para cada día</p>
            </div>
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="pt-6 space-y-3">
                {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                  const blocks = availConfig[day] ?? [{ enabled: false, start: "09:00", end: "17:00" }];
                  return (
                    <div key={day} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 hover:border-slate-200 transition-colors">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-3 min-w-[140px]">
                          <Switch
                            checked={blocks.some((b) => b.enabled)}
                            onCheckedChange={(checked) => {
                              setAvailConfig((prev) => ({
                                ...prev,
                                [day]: checked
                                  ? [{ enabled: true, start: "09:00", end: "17:00" }]
                                  : [{ enabled: false, start: "09:00", end: "17:00" }],
                              }));
                            }}
                          />
                          <span className={`font-medium text-sm ${blocks.some((b) => b.enabled) ? "text-slate-900" : "text-slate-400"}`}>
                            {DAYS[day]}
                          </span>
                        </div>
                        {blocks.map((block, bi) => (
                          <div key={bi} className="flex items-center gap-2">
                            {block.enabled ? (
                              <>
                                <Input type="time" value={block.start}
                                  onChange={(e) => {
                                    const newConfig = { ...availConfig };
                                    newConfig[day] = [...newConfig[day] ?? []];
                                    newConfig[day][bi] = { ...newConfig[day][bi], start: e.target.value };
                                    setAvailConfig(newConfig);
                                  }}
                                  className="w-28 h-9 text-sm border-slate-200" />
                                <span className="text-slate-400 text-sm">a</span>
                                <Input type="time" value={block.end}
                                  onChange={(e) => {
                                    const newConfig = { ...availConfig };
                                    newConfig[day] = [...newConfig[day] ?? []];
                                    newConfig[day][bi] = { ...newConfig[day][bi], end: e.target.value };
                                    setAvailConfig(newConfig);
                                  }}
                                  className="w-28 h-9 text-sm border-slate-200" />
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500"
                                  onClick={() => {
                                    const newConfig = { ...availConfig };
                                    newConfig[day] = newConfig[day].filter((_, i) => i !== bi);
                                    if (newConfig[day].length === 0) newConfig[day] = [{ enabled: false, start: "09:00", end: "17:00" }];
                                    setAvailConfig(newConfig);
                                  }}>
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <span className="text-sm text-slate-400 italic">No disponible</span>
                            )}
                          </div>
                        ))}
                        {blocks.some((b) => b.enabled) && (
                          <Button size="sm" variant="ghost" className="h-8 text-xs text-blue-600 hover:text-blue-700"
                            onClick={() => {
                              const newConfig = { ...availConfig };
                              newConfig[day] = [...(newConfig[day] ?? []), { enabled: true, start: "09:00", end: "17:00" }];
                              setAvailConfig(newConfig);
                            }}>
                            <Plus className="h-3 w-3 mr-1" /> Agregar
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
                <Button onClick={() => saveAvailMut.mutate()} disabled={saveAvailMut.isPending}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all h-11">
                  {saveAvailMut.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Guardar disponibilidad
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Bookings */}
          <TabsContent value="bookings" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Reservas</h2>
              <p className="text-sm text-slate-500">Turnos recibidos de tus clientes</p>
            </div>
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="pt-6">
                {bookingsQ.isLoading ? (
                  <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-blue-500" /></div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-100">
                          <TableHead className="text-xs font-semibold text-slate-500 uppercase">Cliente</TableHead>
                          <TableHead className="text-xs font-semibold text-slate-500 uppercase">Evento</TableHead>
                          <TableHead className="text-xs font-semibold text-slate-500 uppercase">Fecha y hora</TableHead>
                          <TableHead className="text-xs font-semibold text-slate-500 uppercase">Estado</TableHead>
                          <TableHead className="text-right text-xs font-semibold text-slate-500 uppercase">Acción</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(bookingsQ.data ?? []).map((b: any) => (
                          <TableRow key={b.id} className="border-slate-100 hover:bg-slate-50/50">
                            <TableCell>
                              <div className="font-medium text-slate-900">{b.client_name}</div>
                              <div className="text-xs text-slate-400">{b.client_email}</div>
                            </TableCell>
                            <TableCell className="text-slate-700">{b.event_types?.name ?? "-"}</TableCell>
                            <TableCell className="text-slate-700">{format(new Date(b.start_at), "PPPp", { locale: es })}</TableCell>
                            <TableCell>
                              <Badge variant={b.status === "confirmed" ? "default" : "destructive"}
                                className={`text-xs ${b.status === "confirmed" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                                {b.status === "confirmed" ? "Confirmada" : "Cancelada"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {b.status === "confirmed" && (
                                <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                                  onClick={() => { if (confirm("¿Cancelar esta reserva?")) cancelMut.mutate(b.id); }}>
                                  Cancelar
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        {(bookingsQ.data ?? []).length === 0 && (
                          <TableRow><TableCell colSpan={5} className="text-center text-sm text-slate-400 py-12">No hay reservas todavía</TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Google Calendar */}
          <TabsContent value="calendar" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Google Calendar</h2>
              <p className="text-sm text-slate-500">Sincronizá tus turnos con Google Calendar</p>
            </div>
            {googleQ.isLoading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-blue-500" /></div>
            ) : googleQ.data?.connected ? (
              <Card className="border-0 bg-white shadow-sm">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-4 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">Google Calendar conectado</p>
                      <p className="text-sm text-green-600">{googleQ.data.email}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">Los nuevos turnos se crearán automáticamente en tu calendario.</p>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={async () => { await disconnectG(); googleQ.refetch(); toast.success("Google Calendar desconectado"); }}>
                    <LogOut className="mr-2 h-4 w-4" /> Desconectar
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 bg-white shadow-sm">
                <CardContent className="pt-6 space-y-6">
                  <div className="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                      <Calendar className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="font-medium text-slate-700">Google Calendar no conectado</p>
                    <p className="text-sm text-slate-400 mt-1">Conectá tu cuenta para sincronizar los turnos automáticamente</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all h-11"
                    onClick={async () => {
                      try {
                        const url = await getGAuthUrl();
                        window.location.href = url;
                      } catch (e: any) {
                        toast.error(e.message ?? "Error al conectar Google Calendar");
                      }
                    }}>
                    <Calendar className="mr-2 h-4 w-4" /> Conectar Google Calendar
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ─── New Event Dialog ─── */
function NewEventDialog({ onSubmit, loading }: { onSubmit: (v: any) => void; loading: boolean }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState("30");
  const [color, setColor] = useState("#3b82f6");
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-lg text-slate-900">Nuevo tipo de evento</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-slate-700">Nombre del evento</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Consulta general" className="mt-1.5 border-slate-200" />
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700">Descripción</Label>
          <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describí brevemente este servicio" className="mt-1.5 border-slate-200" rows={3} />
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700">Duración</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="mt-1.5 border-slate-200"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[15, 30, 45, 60, 90, 120].map((m) => <SelectItem key={m} value={String(m)}>{m} minutos</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700">Color</Label>
          <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="mt-1.5 h-10 p-1 border-slate-200" />
        </div>
      </div>
      <DialogFooter className="mt-6">
        <Button disabled={loading || !name}
          onClick={() => onSubmit({ name, description: desc, duration_min: Number(duration), color })}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Crear evento
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

/* ─── Edit Event + Questions Dialog ─── */
function EditEventDialog({
  event, questions, onSaveEvent, onSaveQuestions, loading,
}: {
  event: EventTypeRow;
  questions: QuestionDef[];
  onSaveEvent: (v: { name?: string; is_active?: boolean }) => Promise<any>;
  onSaveQuestions: (qs: QuestionDef[]) => Promise<void>;
  loading: boolean;
}) {
  const [name, setName] = useState(event.name);
  const [active, setActive] = useState(event.is_active);
  const [qs, setQs] = useState<QuestionDef[]>(questions.length > 0 ? questions : []);

  const addQuestion = () => setQs([...qs, { label: "", field_type: "text", options: [], required: false, order_idx: qs.length }]);
  const updQ = (i: number, f: string, v: any) => {
    const copy = [...qs]; (copy[i] as any)[f] = v; setQs(copy);
  };
  const delQ = (i: number) => setQs(qs.filter((_, j) => j !== i));

  const addOption = (qi: number) => {
    const copy = [...qs];
    copy[qi].options = [...(copy[qi].options ?? []), ""];
    setQs(copy);
  };
  const updOption = (qi: number, oi: number, val: string) => {
    const copy = [...qs];
    copy[qi].options[oi] = val;
    setQs(copy);
  };
  const delOption = (qi: number, oi: number) => {
    const copy = [...qs];
    copy[qi].options = copy[qi].options.filter((_, j) => j !== oi);
    setQs(copy);
  };

  const handleSave = async () => {
    await onSaveEvent({ name, is_active: active });
    await onSaveQuestions(qs);
  };

  return (
    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-lg text-slate-900">Editar evento</DialogTitle>
      </DialogHeader>

      {/* Basic info */}
      <div className="space-y-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label className="text-sm font-medium text-slate-700">Nombre</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 border-slate-200" />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch checked={active} onCheckedChange={setActive} />
            <Label className="text-sm text-slate-600">Activo</Label>
          </div>
        </div>
      </div>

      {/* Questions section */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700">Campos del formulario</h3>
          <Button size="sm" variant="outline" onClick={addQuestion} className="text-xs border-slate-200">
            <Plus className="h-3 w-3 mr-1" /> Agregar campo
          </Button>
        </div>

        {qs.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-xl">
            No hay campos personalizados. Agregá uno para que los clientes completen datos.
          </div>
        )}

        <div className="space-y-3">
          {qs.map((q, i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Campo {i + 1}</span>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-red-500 hover:bg-red-50"
                  onClick={() => delQ(i)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              <Input placeholder="Ej: ¿Cuál es tu motivo de consulta?"
                value={q.label} onChange={(e) => updQ(i, "label", e.target.value)}
                className="border-slate-200" />

              <div className="flex items-center gap-3">
                <Select value={q.field_type} onValueChange={(v) => updQ(i, "field_type", v)}>
                  <SelectTrigger className="flex-1 border-slate-200"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FIELD_TYPES.map((ft) => <SelectItem key={ft.value} value={ft.value}>{ft.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 shrink-0">
                  <Switch checked={q.required} onCheckedChange={(v) => updQ(i, "required", v)} />
                  <Label className="text-xs text-slate-500">Obligatorio</Label>
                </div>
              </div>

              {["dropdown", "radio", "checkbox"].includes(q.field_type) && (
                <div className="space-y-2 pl-2">
                  <Label className="text-xs font-medium text-slate-500">Opciones</Label>
                  {(q.options ?? []).map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-xs text-slate-400 shrink-0">
                        {oi + 1}
                      </div>
                      <Input value={opt} onChange={(e) => updOption(i, oi, e.target.value)}
                        placeholder={`Opción ${oi + 1}`}
                        className="flex-1 border-slate-200 h-9 text-sm" />
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500 shrink-0"
                        onClick={() => delOption(i, oi)}>
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" variant="ghost" onClick={() => addOption(i)}
                    className="text-blue-600 hover:text-blue-700 text-xs h-8">
                    <Plus className="h-3 w-3 mr-1" /> Agregar opción
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <DialogFooter className="mt-6 pt-4 border-t border-slate-100">
        <Button disabled={loading || !name}
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Guardar cambios
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
