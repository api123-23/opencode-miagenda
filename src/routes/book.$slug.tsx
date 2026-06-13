import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { format, addDays, startOfDay, isSameDay, parseISO, addMinutes, differenceInMinutes } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Loader2, Calendar, ChevronLeft, ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import { getProfileBySlug, getPublicEventTypes, getAvailabilityByUser, getBookedSlots, createBooking } from "@/lib/public.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/book/$slug")({
  ssr: false,
  component: BookPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center">
          <h2 className="text-xl font-semibold">Perfil no encontrado</h2>
          <p className="text-sm text-muted-foreground mt-2">El enlace no es válido o el profesional no existe.</p>
        </CardContent>
      </Card>
    </div>
  ),
});

type Step = "event" | "datetime" | "form" | "confirm";

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function BookPage() {
  const { slug } = Route.useParams();
  const getProfile = useServerFn(getProfileBySlug);
  const getEvents = useServerFn(getPublicEventTypes);
  const getAvail = useServerFn(getAvailabilityByUser);
  const getBooked = useServerFn(getBookedSlots);
  const createB = useServerFn(createBooking);

  const profileQ = useQuery({
    queryKey: ["public-profile", slug],
    queryFn: () => getProfile({ data: { slug } }),
  });

  const eventsQ = useQuery({
    queryKey: ["public-events", profileQ.data?.id],
    queryFn: () => getEvents({ data: { user_id: profileQ.data!.id } }),
    enabled: !!profileQ.data,
  });

  const availQ = useQuery({
    queryKey: ["public-avail", profileQ.data?.id],
    queryFn: () => getAvail({ data: { user_id: profileQ.data!.id } }),
    enabled: !!profileQ.data,
  });

  const [step, setStep] = useState<Step>("event");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);

  const weekDates = useMemo(() => {
    const today = startOfDay(new Date());
    return Array.from({ length: 21 }, (_, i) => addDays(today, i));
  }, []);

  const availableWeekdays = useMemo(() => {
    if (!availQ.data) return [];
    return [...new Set(availQ.data.map((s: any) => s.weekday))];
  }, [availQ.data]);

  const selectedDateBookingsQ = useQuery({
    queryKey: ["booked-slots", profileQ.data?.id, selectedDate],
    queryFn: () => getBooked({ data: { user_id: profileQ.data!.id, date: selectedDate! } }),
    enabled: !!profileQ.data && !!selectedDate,
  });

  const slotsWithStatus = useMemo(() => {
    if (!selectedDate || !availQ.data || !selectedEvent || !selectedDateBookingsQ.data) return [];
    const date = new Date(selectedDate + "T00:00:00");
    const weekday = date.getDay();
    const daySlots = availQ.data.filter((s: any) => s.weekday === weekday);
    const duration = selectedEvent.duration_min;
    const bookedRanges = selectedDateBookingsQ.data.map((b: any) => ({
      start: new Date(b.start_at).getTime(),
      end: new Date(b.end_at).getTime(),
    }));
    const result: { time: string; booked: boolean }[] = [];
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
      while (cursor + duration * 60000 <= dayEnd.getTime()) {
        const slotEnd = cursor + duration * 60000;
        const booked = bookedRanges.some((br) => cursor < br.end && slotEnd > br.start);
        result.push({ time: format(new Date(cursor), "HH:mm"), booked });
        cursor += duration * 60000;
      }
    }
    return result;
  }, [selectedDate, availQ.data, selectedEvent, selectedDateBookingsQ.data]);

  const handleConfirm = async () => {
    if (!selectedEvent || !selectedDate || !selectedTime) return;
    setSubmitting(true);
    const [h, m] = selectedTime.split(":").map(Number);
    const start = new Date(selectedDate + "T00:00:00");
    start.setHours(h, m, 0, 0);
    const end = new Date(start.getTime() + selectedEvent.duration_min * 60000);
    try {
      const result = await createB({
        data: {
          user_id: profileQ.data!.id,
          event_type_id: selectedEvent.id,
          start_at: start.toISOString(),
          end_at: end.toISOString(),
          client_name: clientName,
          client_email: clientEmail,
          client_answers: answers,
        },
      });
      setBookingResult(result);
      setStep("confirm");
      toast.success("Turno reservado con éxito");
    } catch (e: any) {
      toast.error(e.message ?? "Error al reservar");
    }
    setSubmitting(false);
  };

  if (profileQ.isLoading) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  }

  const profile = profileQ.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Calendar className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">{profile?.display_name ?? "Profesional"}</h1>
          <p className="text-sm text-muted-foreground mt-1">{profile?.welcome_message}</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {["event", "datetime", "form", "confirm"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                step === s ? "bg-primary text-primary-foreground" : 
                ["event", "datetime", "form", "confirm"].indexOf(step) > i ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
              }`}>
                {["event", "datetime", "form", "confirm"].indexOf(step) > i ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              {i < 3 && <div className="h-px w-8 bg-muted" />}
            </div>
          ))}
        </div>

        <Card className="shadow-lg">
          {/* Step 1: Select event type */}
          {step === "event" && (
            <>
              <CardHeader>
                <CardTitle>Seleccioná un tipo de turno</CardTitle>
                <CardDescription>Elegí el servicio que querés reservar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventsQ.isLoading ? (
                  <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin" /></div>
                ) : (eventsQ.data ?? []).length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No hay eventos disponibles</p>
                ) : (
                  (eventsQ.data ?? []).map((et: any) => (
                    <button
                      key={et.id}
                      onClick={() => { setSelectedEvent(et); setStep("datetime"); }}
                      className="w-full text-left rounded-lg border p-4 hover:border-primary hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                          style={{ backgroundColor: et.color }}>
                          {et.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{et.name}</h3>
                          {et.description && <p className="text-xs text-muted-foreground truncate">{et.description}</p>}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                          <Clock className="h-3.5 w-3.5" />
                          {et.duration_min} min
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </CardContent>
            </>
          )}

          {/* Step 2: Select date & time */}
          {step === "datetime" && (
            <>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setStep("event")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <CardTitle>Elegí día y hora</CardTitle>
                    <CardDescription>{selectedEvent?.name} · {selectedEvent?.duration_min} min</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Días disponibles</h4>
                    <div className="space-y-1 max-h-[320px] overflow-y-auto">
                      {weekDates.map((date) => {
                        const wd = date.getDay();
                        const disabled = !availableWeekdays.includes(wd);
                        const dateStr = format(date, "yyyy-MM-dd");
                        const isSelected = selectedDate === dateStr;
                        return (
                          <button
                            key={dateStr}
                            disabled={disabled}
                            onClick={() => { setSelectedDate(dateStr); setSelectedTime(null); }}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              isSelected ? "bg-primary text-primary-foreground" :
                              disabled ? "text-muted-foreground/40 cursor-not-allowed" :
                              "hover:bg-accent"
                            }`}
                          >
                            <span className="font-medium">{format(date, "EEE", { locale: es })}</span>
                            <span className="ml-2">{format(date, "d MMM", { locale: es })}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Horarios {selectedDate ? format(parseISO(selectedDate), "d 'de' MMMM", { locale: es }) : ""}
                    </h4>
                    {!selectedDate ? (
                      <p className="text-sm text-muted-foreground">Seleccioná un día</p>
                    ) : selectedDateBookingsQ.isLoading ? (
                      <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin" /></div>
                    ) : slotsWithStatus.filter((s) => !s.booked).length === 0 ? (
                      <p className="text-sm text-muted-foreground">No hay horarios disponibles este día</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto">
                        {slotsWithStatus.map(({ time, booked }) => (
                          <button
                            key={time}
                            disabled={booked}
                            onClick={() => !booked && setSelectedTime(time)}
                            className={`px-3 py-2 rounded-md text-sm border transition-colors ${
                              booked ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed line-through" :
                              selectedTime === time ? "border-primary bg-primary/10 text-primary font-medium" :
                              "hover:border-primary hover:bg-accent"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  className="w-full mt-6"
                  disabled={!selectedTime}
                  onClick={() => setStep("form")}
                >
                  Continuar <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </>
          )}

          {/* Step 3: Client form */}
          {step === "form" && (
            <>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setStep("datetime")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <CardTitle>Tus datos</CardTitle>
                    <CardDescription>
                      {selectedEvent?.name} · {selectedDate && format(parseISO(selectedDate), "d 'de' MMMM", { locale: es })} a las {selectedTime}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Nombre completo *</Label>
                  <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Tu nombre" />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="tu@email.com" />
                </div>
                <Separator />
                {(selectedEvent?.event_questions ?? []).map((q: any) => (
                  <div key={q.id}>
                    <Label>{q.label}{q.required ? " *" : ""}</Label>
                    {q.field_type === "text" && (
                      <Input value={answers[q.id] ?? ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} />
                    )}
                    {q.field_type === "textarea" && (
                      <Textarea value={answers[q.id] ?? ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} />
                    )}
                    {q.field_type === "email" && (
                      <Input type="email" value={answers[q.id] ?? ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} />
                    )}
                    {q.field_type === "phone" && (
                      <Input type="tel" value={answers[q.id] ?? ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} />
                    )}
                    {q.field_type === "dropdown" && (
                      <Select value={answers[q.id] ?? ""} onValueChange={(v) => setAnswers({ ...answers, [q.id]: v })}>
                        <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                        <SelectContent>
                          {(typeof q.options === "string" ? JSON.parse(q.options) : q.options ?? []).map((opt: string) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {q.field_type === "radio" && (
                      <RadioGroup value={answers[q.id] ?? ""} onValueChange={(v) => setAnswers({ ...answers, [q.id]: v })}>
                        {(typeof q.options === "string" ? JSON.parse(q.options) : q.options ?? []).map((opt: string) => (
                          <div key={opt} className="flex items-center gap-2">
                            <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                            <Label htmlFor={`${q.id}-${opt}`} className="font-normal">{opt}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                    {q.field_type === "checkbox" && (
                      <div className="space-y-2">
                        {(typeof q.options === "string" ? JSON.parse(q.options) : q.options ?? []).map((opt: string) => {
                          const val = answers[q.id] ?? "";
                          const checked = val.split(",").includes(opt);
                          return (
                            <div key={opt} className="flex items-center gap-2">
                              <Checkbox
                                id={`${q.id}-${opt}`}
                                checked={checked}
                                onCheckedChange={(c) => {
                                  const current = val ? val.split(",") : [];
                                  const next = c ? [...current, opt] : current.filter((x) => x !== opt);
                                  setAnswers({ ...answers, [q.id]: next.join(",") });
                                }}
                              />
                              <Label htmlFor={`${q.id}-${opt}`} className="font-normal">{opt}</Label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  className="w-full"
                  disabled={submitting || !clientName || !clientEmail}
                  onClick={handleConfirm}
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Confirmar turno
                </Button>
              </CardContent>
            </>
          )}

          {/* Step 4: Confirmation */}
          {step === "confirm" && (
            <CardContent className="pt-8 pb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold">Turno confirmado</h2>
              <p className="text-sm text-muted-foreground mt-2 mb-6">
                {selectedEvent?.name} · {selectedDate && format(parseISO(selectedDate), "EEEE d 'de' MMMM", { locale: es })} a las {selectedTime}
              </p>
              <div className="rounded-lg bg-muted p-4 text-sm space-y-1 mb-6">
                <p><strong>Cliente:</strong> {clientName}</p>
                <p><strong>Email:</strong> {clientEmail}</p>
              </div>
              <p className="text-xs text-muted-foreground">Te enviamos un email de confirmación a {clientEmail}</p>
              <Button variant="outline" className="mt-6" onClick={() => window.location.reload()}>
                Reservar otro turno
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
