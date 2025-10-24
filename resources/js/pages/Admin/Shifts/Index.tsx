import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Clock, Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Shift {
    id: number;
    name: string;
    code: string;
    start_time: string;
    end_time: string;
    description?: string;
    employee_count: number;
}

interface ShiftsIndexProps {
    shifts: {
        data: Shift[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function ShiftsIndex({ shifts }: ShiftsIndexProps) {
    const [search, setSearch] = useState('');
    const [editingShift, setEditingShift] = useState<Shift | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        code: '',
        start_time: '',
        end_time: '',
        description: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/shifts', { search }, { preserveState: true });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingShift) {
            put(`/admin/shifts/${editingShift.id}`, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                    setEditingShift(null);
                },
            });
        } else {
            post('/admin/shifts', {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (shift: Shift) => {
        setEditingShift(shift);
        setData({
            name: shift.name,
            code: shift.code,
            start_time: shift.start_time,
            end_time: shift.end_time,
            description: shift.description || '',
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus shift ini?')) {
            router.delete(`/admin/shifts/${id}`);
        }
    };

    const openCreateDialog = () => {
        setEditingShift(null);
        reset();
        setIsDialogOpen(true);
    };

    return (
        <AdminLayout title="Shift">
            <Head title="Shift" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Shift</h1>
                        <p className="text-muted-foreground">
                            Kelola jadwal shift kerja
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateDialog}>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Shift
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingShift
                                            ? 'Edit Shift'
                                            : 'Tambah Shift'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {editingShift
                                            ? 'Ubah data shift'
                                            : 'Buat shift baru'}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div>
                                        <Label htmlFor="code">Kode *</Label>
                                        <Input
                                            id="code"
                                            value={data.code}
                                            onChange={(e) =>
                                                setData('code', e.target.value)
                                            }
                                            placeholder="PAGI, SIANG, MALAM"
                                        />
                                        {errors.code && (
                                            <p className="text-destructive mt-1 text-sm">
                                                {errors.code}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="name">
                                            Nama Shift *
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            placeholder="Shift Pagi"
                                        />
                                        {errors.name && (
                                            <p className="text-destructive mt-1 text-sm">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="start_time">
                                                Jam Mulai *
                                            </Label>
                                            <Input
                                                id="start_time"
                                                type="time"
                                                value={data.start_time}
                                                onChange={(e) =>
                                                    setData(
                                                        'start_time',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {errors.start_time && (
                                                <p className="text-destructive mt-1 text-sm">
                                                    {errors.start_time}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="end_time">
                                                Jam Selesai *
                                            </Label>
                                            <Input
                                                id="end_time"
                                                type="time"
                                                value={data.end_time}
                                                onChange={(e) =>
                                                    setData(
                                                        'end_time',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {errors.end_time && (
                                                <p className="text-destructive mt-1 text-sm">
                                                    {errors.end_time}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="description">
                                            Deskripsi
                                        </Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Deskripsi shift"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsDialogOpen(false)}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Menyimpan...'
                                            : editingShift
                                              ? 'Update'
                                              : 'Simpan'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Shift
                            </CardTitle>
                            <Clock className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {shifts.total}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                                <Input
                                    placeholder="Cari shift..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button type="submit">Cari</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kode</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Jam Mulai</TableHead>
                                    <TableHead>Jam Selesai</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead className="text-center">
                                        Jumlah Pegawai
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {shifts.data.length > 0 ? (
                                    shifts.data.map((shift) => (
                                        <TableRow key={shift.id}>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {shift.code}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {shift.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {shift.start_time}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {shift.end_time}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {shift.description || '-'}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge>
                                                    {shift.employee_count}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleEdit(shift)
                                                        }
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                shift.id,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-muted-foreground py-8 text-center"
                                        >
                                            Tidak ada data shift
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
