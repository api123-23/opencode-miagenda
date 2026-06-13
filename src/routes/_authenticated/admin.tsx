import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listUsers, createUserAccount, updateUserAccount, deleteUserAccount } from "@/lib/admin.functions";
import { useState } from "react";
import { Loader2, Plus, Pencil, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

type UserRow = {
  id: string;
  email: string;
  internal_name: string;
  display_name: string;
  slug: string;
  google_email: string | null;
  created_at: string;
};

function AdminPage() {
  const { role, signOut, user, loading } = useAuth();
  const list = useServerFn(listUsers);
  const create = useServerFn(createUserAccount);
  const update = useServerFn(updateUserAccount);
  const remove = useServerFn(deleteUserAccount);
  const qc = useQueryClient();

  const [openCreate, setOpenCreate] = useState(false);
  const [editUser, setEditUser] = useState<UserRow | null>(null);

  const usersQ = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => list(),
    enabled: role === "admin",
  });

  const createM = useMutation({
    mutationFn: (vars: { email: string; password: string; internal_name: string; display_name: string }) =>
      create({ data: vars }),
    onSuccess: () => {
      toast.success("Usuario creado");
      setOpenCreate(false);
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateM = useMutation({
    mutationFn: (vars: { id: string; internal_name?: string; display_name?: string; password?: string; email?: string }) =>
      update({ data: vars }),
    onSuccess: () => {
      toast.success("Usuario actualizado");
      setEditUser(null);
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteM = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      toast.success("Usuario eliminado");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (loading) return null;
  if (role && role !== "admin") return <Navigate to="/dashboard" replace />;

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={signOut}>Cerrar sesión</Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Usuarios profesionales</CardTitle>
            <Dialog open={openCreate} onOpenChange={setOpenCreate}>
              <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Nuevo usuario</Button>
              </DialogTrigger>
              <CreateUserDialog onSubmit={(v) => createM.mutate(v)} loading={createM.isPending} />
            </Dialog>
          </CardHeader>
          <CardContent>
            {usersQ.isLoading ? (
              <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre interno</TableHead>
                      <TableHead>Nombre público</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>URL pública</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(usersQ.data ?? []).map((u: UserRow) => {
                      const url = `${origin}/book/${u.slug}`;
                      return (
                        <TableRow key={u.id}>
                          <TableCell className="font-medium">{u.internal_name}</TableCell>
                          <TableCell>{u.display_name}</TableCell>
                          <TableCell className="text-sm">{u.email}</TableCell>
                          <TableCell>
                            <button
                              className="text-xs text-blue-600 underline inline-flex items-center gap-1"
                              onClick={() => {
                                navigator.clipboard.writeText(url);
                                toast.success("URL copiada");
                              }}
                            >
                              /book/{u.slug} <Copy className="h-3 w-3" />
                            </button>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button size="sm" variant="outline" onClick={() => setEditUser(u)}>
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                if (confirm(`¿Eliminar a ${u.internal_name}? Esta acción no se puede deshacer.`)) {
                                  deleteM.mutate(u.id);
                                }
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {usersQ.data && usersQ.data.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-8">
                          No hay usuarios todavía. Creá el primero.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!editUser} onOpenChange={(o) => !o && setEditUser(null)}>
        {editUser && (
          <EditUserDialog
            user={editUser}
            onSubmit={(v) => updateM.mutate({ id: editUser.id, ...v })}
            loading={updateM.isPending}
          />
        )}
      </Dialog>
    </div>
  );
}

function CreateUserDialog({
  onSubmit,
  loading,
}: {
  onSubmit: (v: { email: string; password: string; internal_name: string; display_name: string }) => void;
  loading: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [internalName, setInternalName] = useState("");
  const [displayName, setDisplayName] = useState("");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Crear usuario profesional</DialogTitle>
      </DialogHeader>
      <div className="space-y-3">
        <div>
          <Label>Nombre interno (solo lo ves vos)</Label>
          <Input value={internalName} onChange={(e) => setInternalName(e.target.value)} placeholder="Ej: Dr. Pérez - clínica norte" />
        </div>
        <div>
          <Label>Nombre público (lo ven los clientes)</Label>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Ej: Dr. Juan Pérez" />
        </div>
        <div>
          <Label>Email de inicio de sesión</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label>Contraseña inicial</Label>
          <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="mín. 8 caracteres" />
        </div>
      </div>
      <DialogFooter>
        <Button
          disabled={loading || !email || password.length < 8 || !internalName || !displayName}
          onClick={() => onSubmit({ email, password, internal_name: internalName, display_name: displayName })}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Crear"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function EditUserDialog({
  user,
  onSubmit,
  loading,
}: {
  user: UserRow;
  onSubmit: (v: { internal_name?: string; display_name?: string; password?: string; email?: string }) => void;
  loading: boolean;
}) {
  const [internalName, setInternalName] = useState(user.internal_name);
  const [displayName, setDisplayName] = useState(user.display_name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar usuario</DialogTitle>
      </DialogHeader>
      <div className="space-y-3">
        <div>
          <Label>Nombre interno</Label>
          <Input value={internalName} onChange={(e) => setInternalName(e.target.value)} />
        </div>
        <div>
          <Label>Nombre público</Label>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label>Nueva contraseña (vacío = sin cambio)</Label>
          <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <DialogFooter>
        <Button
          disabled={loading}
          onClick={() =>
            onSubmit({
              internal_name: internalName !== user.internal_name ? internalName : undefined,
              display_name: displayName !== user.display_name ? displayName : undefined,
              email: email !== user.email ? email : undefined,
              password: password.length >= 8 ? password : undefined,
            })
          }
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
