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
import { Briefcase, Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Position {
    id: number;
    name: string;
    code: string;
    description?: string;
    employee_count: number;
    level?: string;
}

interface PositionsIndexProps {
    positions: {
        data: Position[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function PositionsIndex({ positions }: PositionsIndexProps) {
    const [search, setSearch] = useState('');
    const [editingPosition, setEditingPosition] = useState<Position | null>(
        null,
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        code: '',
        description: '',
        level: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/positions', { search }, { preserveState: true });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPosition) {
            put(`/admin/positions/${editingPosition.id}`, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                    setEditingPosition(null);
                },
            });
        } else {
            post('/admin/positions', {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (position: Position) => {
        setEditingPosition(position);
        setData({
            name: position.name,
            code: position.code,
            description: position.description || '',
            level: position.level || '',
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus posisi ini?')) {
            router.delete(`/admin/positions/${id}`);
        }
    };

    const openCreateDialog = () => {
        setEditingPosition(null);
        reset();
        setIsDialogOpen(true);
    };

    return (
        <AdminLayout title="Posisi">
            <Head title="Posisi" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Posisi</h1>
                        <p className="text-muted-foreground">
                            Kelola posisi jabatan pegawai
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateDialog}>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Posisi
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingPosition
                                            ? 'Edit Posisi'
                                            : 'Tambah Posisi'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {editingPosition
                                            ? 'Ubah data posisi'
                                            : 'Buat posisi baru'}
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
                                            placeholder="MGR, SPV"
                                        />
                                        {errors.code && (
                                            <p className="text-destructive mt-1 text-sm">
                                                {errors.code}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="name">
                                            Nama Posisi *
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            placeholder="Manager, Supervisor"
                                        />
                                        {errors.name && (
                                            <p className="text-destructive mt-1 text-sm">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="level">Level</Label>
                                        <Input
                                            id="level"
                                            value={data.level}
                                            onChange={(e) =>
                                                setData('level', e.target.value)
                                            }
                                            placeholder="Senior, Junior"
                                        />
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
                                            placeholder="Deskripsi posisi"
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
                                            : editingPosition
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
                                Total Posisi
                            </CardTitle>
                            <Briefcase className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {positions.total}
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
                                    placeholder="Cari posisi..."
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
                                    <TableHead>Level</TableHead>
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
                                {positions.data.length > 0 ? (
                                    positions.data.map((position) => (
                                        <TableRow key={position.id}>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {position.code}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {position.name}
                                            </TableCell>
                                            <TableCell>
                                                {position.level ? (
                                                    <Badge variant="secondary">
                                                        {position.level}
                                                    </Badge>
                                                ) : (
                                                    '-'
                                                )}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {position.description || '-'}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge>
                                                    {position.employee_count}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleEdit(position)
                                                        }
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                position.id,
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
                                            colSpan={6}
                                            className="text-muted-foreground py-8 text-center"
                                        >
                                            Tidak ada data posisi
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
