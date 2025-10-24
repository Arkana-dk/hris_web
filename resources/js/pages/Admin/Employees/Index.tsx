import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
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
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Edit,
    Eye,
    Filter,
    MoreVertical,
    Plus,
    Search,
    Trash2,
    Upload,
} from 'lucide-react';
import { useState } from 'react';

interface Employee {
    id: number;
    employee_number: string;
    name: string;
    email: string;
    phone: string;
    position: {
        id: number;
        name: string;
    };
    department: {
        id: number;
        name: string;
    };
    status: 'active' | 'inactive' | 'probation';
    join_date: string;
    avatar?: string;
}

interface EmployeeIndexProps {
    employees: {
        data: Employee[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    departments: Array<{ id: number; name: string }>;
    positions: Array<{ id: number; name: string }>;
    filters: {
        search?: string;
        department?: string;
        position?: string;
        status?: string;
    };
}

export default function EmployeeIndex({
    employees,
    departments,
    positions,
    filters,
}: EmployeeIndexProps) {
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleSelectAll = () => {
        if (selectedEmployees.length === employees.data.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employees.data.map((emp) => emp.id));
        }
    };

    const handleSelectEmployee = (id: number) => {
        setSelectedEmployees((prev) =>
            prev.includes(id)
                ? prev.filter((empId) => empId !== id)
                : [...prev, id],
        );
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const department = formData.get('department') as string;
        const position = formData.get('position') as string;
        const status = formData.get('status') as string;

        router.get('/admin/employees', {
            search,
            department,
            position,
            status,
        });
    };

    const handleDelete = (id: number) => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (deleteId) {
            router.delete(`/admin/employees/${deleteId}`);
            setDeleteDialogOpen(false);
            setDeleteId(null);
        }
    };

    const handleBulkDelete = () => {
        if (selectedEmployees.length > 0) {
            router.post('/admin/employees/bulk-delete', {
                ids: selectedEmployees,
            });
            setSelectedEmployees([]);
        }
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
            active: 'default',
            inactive: 'secondary',
            probation: 'outline',
        };
        const variant = variants[status] || 'default';
        return (
            <Badge variant={variant}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <AdminLayout title="Data Pegawai">
            <Head title="Data Pegawai" />

            {/* Hero Card */}
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="text-2xl">
                                Data Pegawai
                            </CardTitle>
                            <CardDescription className="mt-1">
                                Total:{' '}
                                <span className="font-semibold">
                                    {employees.total}
                                </span>{' '}
                                pegawai
                                {' • '}
                                Tampil:{' '}
                                <span className="font-semibold">
                                    {employees.data.length}
                                </span>{' '}
                                item
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button asChild>
                                <Link href="/admin/employees/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Pegawai
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/admin/employee/import/form">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Excel
                                </Link>
                            </Button>
                            {selectedEmployees.length > 0 && (
                                <Button
                                    variant="destructive"
                                    onClick={handleBulkDelete}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Hapus ({selectedEmployees.length})
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Filter Card */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-4">
                            <div>
                                <Input
                                    name="search"
                                    placeholder="Cari nama, nomor, email..."
                                    defaultValue={filters.search}
                                    icon={<Search className="h-4 w-4" />}
                                />
                            </div>
                            <div>
                                <Select
                                    name="department"
                                    defaultValue={filters.department}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Departemen" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">
                                            Semua Departemen
                                        </SelectItem>
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
                            </div>
                            <div>
                                <Select
                                    name="position"
                                    defaultValue={filters.position}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Posisi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">
                                            Semua Posisi
                                        </SelectItem>
                                        {positions.map((pos) => (
                                            <SelectItem
                                                key={pos.id}
                                                value={pos.id.toString()}
                                            >
                                                {pos.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Select
                                    name="status"
                                    defaultValue={filters.status}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">
                                            Semua Status
                                        </SelectItem>
                                        <SelectItem value="active">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            Inactive
                                        </SelectItem>
                                        <SelectItem value="probation">
                                            Probation
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                            <Button type="button" variant="outline" asChild>
                                <Link href="/admin/employees">Reset</Link>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="ml-auto"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Export Excel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Table Card */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={
                                                selectedEmployees.length ===
                                                employees.data.length
                                            }
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Pegawai</TableHead>
                                    <TableHead>Nomor</TableHead>
                                    <TableHead>Departemen</TableHead>
                                    <TableHead>Posisi</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tanggal Masuk</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.data.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedEmployees.includes(
                                                    employee.id,
                                                )}
                                                onCheckedChange={() =>
                                                    handleSelectEmployee(
                                                        employee.id,
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={employee.avatar}
                                                    />
                                                    <AvatarFallback>
                                                        {employee.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">
                                                        {employee.name}
                                                    </div>
                                                    <div className="text-muted-foreground text-sm">
                                                        {employee.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {employee.employee_number}
                                        </TableCell>
                                        <TableCell>
                                            {employee.department.name}
                                        </TableCell>
                                        <TableCell>
                                            {employee.position.name}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(employee.status)}
                                        </TableCell>
                                        <TableCell>
                                            {employee.join_date}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Aksi
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/admin/employees/${employee.id}`}
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Lihat Detail
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/admin/employees/${employee.id}/edit`}
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-destructive"
                                                        onClick={() =>
                                                            handleDelete(
                                                                employee.id,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t px-6 py-4">
                        <div className="text-muted-foreground text-sm">
                            Menampilkan {employees.data.length} dari{' '}
                            {employees.total} pegawai
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={employees.current_page === 1}
                                asChild
                            >
                                <Link
                                    href={`/admin/employees?page=${employees.current_page - 1}`}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Link>
                            </Button>
                            <div className="text-sm">
                                Page {employees.current_page} of{' '}
                                {employees.last_page}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={
                                    employees.current_page ===
                                    employees.last_page
                                }
                                asChild
                            >
                                <Link
                                    href={`/admin/employees?page=${employees.current_page + 1}`}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Delete Dialog */}
            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Aksi ini tidak dapat dibatalkan. Data pegawai akan
                            dihapus secara permanen dari sistem.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminLayout>
    );
}
