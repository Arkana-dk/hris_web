import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Calendar, DollarSign, Eye, FileDown, Plus } from 'lucide-react';

interface PayRun {
    id: number;
    period: string;
    pay_date: string;
    status: 'draft' | 'processing' | 'completed' | 'cancelled';
    total_employees: number;
    total_gross: number;
    total_deductions: number;
    total_net: number;
    created_by: { name: string };
    created_at: string;
}

interface PayRunsIndexProps {
    payRuns: {
        data: PayRun[];
        current_page: number;
        last_page: number;
        total: number;
    };
    stats: {
        this_month_total: number;
        pending_count: number;
        completed_count: number;
    };
}

export default function PayRunsIndex({ payRuns, stats }: PayRunsIndexProps) {
    const handleExport = (id: number) => {
        const link = document.createElement('a');
        link.href = `/admin/payruns/${id}/export`;
        link.click();
    };

    const statusColors: Record<
        string,
        'default' | 'secondary' | 'destructive'
    > = {
        draft: 'default',
        processing: 'secondary',
        completed: 'default',
        cancelled: 'destructive',
    };

    return (
        <AdminLayout title="Payroll">
            <Head title="Payroll" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Payroll</h1>
                        <p className="text-muted-foreground">
                            Kelola penggajian pegawai
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/payruns/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Buat Payroll Baru
                        </Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Bulan Ini
                            </CardTitle>
                            <DollarSign className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                Rp{' '}
                                {stats.this_month_total.toLocaleString('id-ID')}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Total gaji bulan ini
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">
                                {stats.pending_count}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Payroll belum selesai
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Selesai
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {stats.completed_count}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Payroll selesai
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Table */}
                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Periode</TableHead>
                                    <TableHead>Tanggal Gaji</TableHead>
                                    <TableHead>Jumlah Pegawai</TableHead>
                                    <TableHead>Total Gross</TableHead>
                                    <TableHead>Total Potongan</TableHead>
                                    <TableHead>Total Nett</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payRuns.data.length > 0 ? (
                                    payRuns.data.map((payRun) => (
                                        <TableRow key={payRun.id}>
                                            <TableCell className="font-medium">
                                                {payRun.period}
                                            </TableCell>
                                            <TableCell>
                                                {format(
                                                    new Date(payRun.pay_date),
                                                    'dd MMM yyyy',
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {payRun.total_employees}{' '}
                                                    orang
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                Rp{' '}
                                                {payRun.total_gross.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </TableCell>
                                            <TableCell className="text-red-600">
                                                -Rp{' '}
                                                {payRun.total_deductions.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </TableCell>
                                            <TableCell className="font-bold">
                                                Rp{' '}
                                                {payRun.total_net.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        statusColors[
                                                            payRun.status
                                                        ]
                                                    }
                                                >
                                                    {payRun.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/payruns/${payRun.id}`}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    {payRun.status ===
                                                        'completed' && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleExport(
                                                                    payRun.id,
                                                                )
                                                            }
                                                        >
                                                            <FileDown className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={8}
                                            className="text-muted-foreground py-8 text-center"
                                        >
                                            Belum ada data payroll
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
