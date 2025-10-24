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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CheckCircle, Clock, Search, XCircle } from 'lucide-react';
import { useState } from 'react';

interface OvertimeRequest {
    id: number;
    employee: {
        name: string;
        employee_number: string;
        department: { name: string };
    };
    date: string;
    start_time: string;
    end_time: string;
    duration: number;
    multiplier: number;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    approved_by?: { name: string };
}

interface OvertimeRequestsIndexProps {
    overtimeRequests: {
        data: OvertimeRequest[];
        current_page: number;
        last_page: number;
        total: number;
    };
    stats: {
        pending: number;
        approved: number;
        rejected: number;
        total_hours: number;
    };
    departments: Array<{ id: number; name: string }>;
}

export default function OvertimeRequestsIndex({
    overtimeRequests,
    stats,
    departments,
}: OvertimeRequestsIndexProps) {
    const [search, setSearch] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('');
    const [actionDialog, setActionDialog] = useState<{
        type: 'approve' | 'reject';
        id: number;
    } | null>(null);

    const handleFilter = () => {
        router.get(
            '/admin/overtime-requests',
            { search, department, status },
            { preserveState: true },
        );
    };

    const handleAction = (type: 'approve' | 'reject', id: number) => {
        setActionDialog({ type, id });
    };

    const confirmAction = () => {
        if (!actionDialog) return;

        const url =
            actionDialog.type === 'approve'
                ? `/admin/overtime-requests/${actionDialog.id}/approve`
                : `/admin/overtime-requests/${actionDialog.id}/reject`;

        router.post(
            url,
            {},
            {
                onSuccess: () => setActionDialog(null),
            },
        );
    };

    const statusColors: Record<
        string,
        'default' | 'warning' | 'success' | 'destructive'
    > = {
        pending: 'warning',
        approved: 'success',
        rejected: 'destructive',
    };

    return (
        <AdminLayout title="Permohonan Lembur">
            <Head title="Permohonan Lembur" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Permohonan Lembur</h1>
                    <p className="text-muted-foreground">
                        Kelola permohonan lembur pegawai
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending
                            </CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">
                                {stats.pending}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Menunggu approval
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Disetujui
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {stats.approved}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Bulan ini
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Ditolak
                            </CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {stats.rejected}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Bulan ini
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Jam
                            </CardTitle>
                            <Clock className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_hours}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Jam lembur bulan ini
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="relative">
                                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                                <Input
                                    placeholder="Cari pegawai..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select
                                value={department}
                                onValueChange={setDepartment}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua Departemen" />
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
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">
                                        Semua Status
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="approved">
                                        Disetujui
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                        Ditolak
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleFilter}>
                                Terapkan Filter
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Pegawai</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Waktu</TableHead>
                                    <TableHead>Durasi</TableHead>
                                    <TableHead>Multiplier</TableHead>
                                    <TableHead>Alasan</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {overtimeRequests.data.length > 0 ? (
                                    overtimeRequests.data.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarFallback>
                                                            {request.employee.name.charAt(
                                                                0,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">
                                                            {
                                                                request.employee
                                                                    .name
                                                            }
                                                        </p>
                                                        <p className="text-muted-foreground text-sm">
                                                            {
                                                                request.employee
                                                                    .department
                                                                    .name
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {format(
                                                    new Date(request.date),
                                                    'dd MMM yyyy',
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p>{request.start_time}</p>
                                                    <p className="text-muted-foreground text-sm">
                                                        s/d {request.end_time}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {request.duration} jam
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge>
                                                    {request.multiplier}x
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {request.reason}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        statusColors[
                                                            request.status
                                                        ]
                                                    }
                                                >
                                                    {request.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {request.status ===
                                                    'pending' && (
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleAction(
                                                                    'approve',
                                                                    request.id,
                                                                )
                                                            }
                                                        >
                                                            <CheckCircle className="mr-1 h-4 w-4" />
                                                            Setujui
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleAction(
                                                                    'reject',
                                                                    request.id,
                                                                )
                                                            }
                                                        >
                                                            <XCircle className="mr-1 h-4 w-4" />
                                                            Tolak
                                                        </Button>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={8}
                                            className="text-muted-foreground py-8 text-center"
                                        >
                                            Tidak ada permohonan lembur
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <AlertDialog
                open={!!actionDialog}
                onOpenChange={() => setActionDialog(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {actionDialog?.type === 'approve'
                                ? 'Setujui Permohonan'
                                : 'Tolak Permohonan'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {actionDialog?.type === 'approve'
                                ? 'Apakah Anda yakin ingin menyetujui permohonan lembur ini?'
                                : 'Apakah Anda yakin ingin menolak permohonan lembur ini?'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmAction}>
                            {actionDialog?.type === 'approve'
                                ? 'Setujui'
                                : 'Tolak'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminLayout>
    );
}
