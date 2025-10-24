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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import { Edit, Layers, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Section {
    id: number;
    name: string;
    code: string;
    description?: string;
    department: { id: number; name: string };
    employee_count: number;
}

interface Department {
    id: number;
    name: string;
}

interface SectionsIndexProps {
    sections: {
        data: Section[];
        current_page: number;
        last_page: number;
        total: number;
    };
    departments: Department[];
}

export default function SectionsIndex({
    sections,
    departments,
}: SectionsIndexProps) {
    const [search, setSearch] = useState('');
    const [editingSection, setEditingSection] = useState<Section | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        code: '',
        description: '',
        department_id: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/sections', { search }, { preserveState: true });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingSection) {
            put(`/admin/sections/${editingSection.id}`, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                    setEditingSection(null);
                },
            });
        } else {
            post('/admin/sections', {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (section: Section) => {
        setEditingSection(section);
        setData({
            name: section.name,
            code: section.code,
            description: section.description || '',
            department_id: section.department.id.toString(),
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus seksi ini?')) {
            router.delete(`/admin/sections/${id}`);
        }
    };

    const openCreateDialog = () => {
        setEditingSection(null);
        reset();
        setIsDialogOpen(true);
    };

    return (
        <AdminLayout title="Seksi">
            <Head title="Seksi" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Seksi</h1>
                        <p className="text-muted-foreground">
                            Kelola seksi dalam departemen
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateDialog}>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Seksi
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingSection
                                            ? 'Edit Seksi'
                                            : 'Tambah Seksi'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {editingSection
                                            ? 'Ubah data seksi'
                                            : 'Buat seksi baru'}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div>
                                        <Label htmlFor="department_id">
                                            Departemen *
                                        </Label>
                                        <Select
                                            value={data.department_id}
                                            onValueChange={(v) =>
                                                setData('department_id', v)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Departemen" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departments.map((dept) => (
                                                    <SelectItem
                                                        key={dept.id}
                                                        value={dept.id.toString()}
                                                    >
                                                        {dept.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.department_id && (
                                            <p className="text-destructive mt-1 text-sm">
                                                {errors.department_id}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="code">Kode *</Label>
                                        <Input
                                            id="code"
                                            value={data.code}
                                            onChange={(e) =>
                                                setData('code', e.target.value)
                                            }
                                            placeholder="DEV, OPS"
                                        />
                                        {errors.code && (
                                            <p className="text-destructive mt-1 text-sm">
                                                {errors.code}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="name">
                                            Nama Seksi *
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            placeholder="Development"
                                        />
                                        {errors.name && (
                                            <p className="text-destructive mt-1 text-sm">
                                                {errors.name}
                                            </p>
                                        )}
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
                                            placeholder="Deskripsi seksi"
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
                                            : editingSection
                                              ? 'Update'
                                              : 'Simpan'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Seksi
                            </CardTitle>
                            <Layers className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {sections.total}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter */}
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                                <Input
                                    placeholder="Cari seksi..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button type="submit">Cari</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kode</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Departemen</TableHead>
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
                                {sections.data.length > 0 ? (
                                    sections.data.map((section) => (
                                        <TableRow key={section.id}>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {section.code}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {section.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge>
                                                    {section.department.name}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {section.description || '-'}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge>
                                                    {section.employee_count}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleEdit(section)
                                                        }
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                section.id,
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
                                            Tidak ada data seksi
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
