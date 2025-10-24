import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    ArrowLeft,
    Briefcase,
    Calendar,
    Clock,
    CreditCard,
    DollarSign,
    Edit,
    FileText,
    Mail,
    MapPin,
    Phone,
} from 'lucide-react';

interface Employee {
    id: number;
    employee_number: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    department: { name: string };
    section?: { name: string };
    position: { name: string };
    group?: { name: string };
    join_date: string;
    status: string;
    identity_number?: string;
    tax_number?: string;
    bank_name?: string;
    bank_account_number?: string;
    bank_account_name?: string;
    created_at: string;
}

interface Attendance {
    date: string;
    clock_in: string;
    clock_out?: string;
    status: string;
}

interface LeaveRequest {
    id: number;
    leave_type: { name: string };
    start_date: string;
    end_date: string;
    status: string;
}

interface OvertimeRequest {
    id: number;
    date: string;
    duration: number;
    reason: string;
    status: string;
}

interface Payslip {
    id: number;
    period: string;
    net_salary: number;
}

interface EmployeeShowProps {
    employee: Employee;
    attendances: Array<Attendance>;
    leaveRequests: Array<LeaveRequest>;
    overtimeRequests: Array<OvertimeRequest>;
    payslips: Array<Payslip>;
}

export default function EmployeeShow({
    employee,
    attendances = [],
    leaveRequests = [],
    overtimeRequests = [],
    payslips = [],
}: EmployeeShowProps) {
    const statusColors: Record<
        string,
        'default' | 'success' | 'warning' | 'destructive'
    > = {
        active: 'success',
        inactive: 'destructive',
        probation: 'warning',
    };

    return (
        <AdminLayout title="Detail Pegawai">
            <Head title={`Detail Pegawai - ${employee.name}`} />

            <div className="mb-4 flex items-center justify-between">
                <Button variant="outline" asChild>
                    <Link href="/admin/employees">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Link>
                </Button>
                <Button asChild>
                    <Link href={`/admin/employees/${employee.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <Avatar className="h-32 w-32">
                                    <AvatarFallback className="text-4xl">
                                        {employee.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        {employee.name}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {employee.employee_number}
                                    </p>
                                </div>
                                <Badge variant={statusColors[employee.status]}>
                                    {employee.status.toUpperCase()}
                                </Badge>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="text-muted-foreground h-4 w-4" />
                                    <span className="text-sm">
                                        {employee.email}
                                    </span>
                                </div>
                                {employee.phone && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="text-muted-foreground h-4 w-4" />
                                        <span className="text-sm">
                                            {employee.phone}
                                        </span>
                                    </div>
                                )}
                                {employee.address && (
                                    <div className="flex items-start gap-3">
                                        <MapPin className="text-muted-foreground mt-0.5 h-4 w-4" />
                                        <span className="text-sm">
                                            {employee.address}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                    <span className="text-sm">
                                        Bergabung{' '}
                                        {format(
                                            new Date(employee.join_date),
                                            'dd MMM yyyy',
                                        )}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Details */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="info" className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="info">Info</TabsTrigger>
                            <TabsTrigger value="attendance">
                                Absensi
                            </TabsTrigger>
                            <TabsTrigger value="leave">Cuti</TabsTrigger>
                            <TabsTrigger value="overtime">Lembur</TabsTrigger>
                            <TabsTrigger value="payroll">Gaji</TabsTrigger>
                        </TabsList>

                        <TabsContent value="info" className="space-y-4">
                            {/* Organization */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Briefcase className="h-5 w-5" />
                                        Informasi Kepegawaian
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <dl className="grid grid-cols-2 gap-4">
                                        <div>
                                            <dt className="text-muted-foreground text-sm">
                                                Departemen
                                            </dt>
                                            <dd className="font-medium">
                                                {employee.department.name}
                                            </dd>
                                        </div>
                                        {employee.section && (
                                            <div>
                                                <dt className="text-muted-foreground text-sm">
                                                    Seksi
                                                </dt>
                                                <dd className="font-medium">
                                                    {employee.section.name}
                                                </dd>
                                            </div>
                                        )}
                                        <div>
                                            <dt className="text-muted-foreground text-sm">
                                                Posisi
                                            </dt>
                                            <dd className="font-medium">
                                                {employee.position.name}
                                            </dd>
                                        </div>
                                        {employee.group && (
                                            <div>
                                                <dt className="text-muted-foreground text-sm">
                                                    Grup
                                                </dt>
                                                <dd className="font-medium">
                                                    {employee.group.name}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </CardContent>
                            </Card>

                            {/* Identity */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Identitas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <dl className="grid grid-cols-2 gap-4">
                                        {employee.identity_number && (
                                            <div>
                                                <dt className="text-muted-foreground text-sm">
                                                    NIK
                                                </dt>
                                                <dd className="font-medium">
                                                    {employee.identity_number}
                                                </dd>
                                            </div>
                                        )}
                                        {employee.tax_number && (
                                            <div>
                                                <dt className="text-muted-foreground text-sm">
                                                    NPWP
                                                </dt>
                                                <dd className="font-medium">
                                                    {employee.tax_number}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </CardContent>
                            </Card>

                            {/* Bank */}
                            {employee.bank_name && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <CreditCard className="h-5 w-5" />
                                            Informasi Bank
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <dl className="grid grid-cols-2 gap-4">
                                            <div>
                                                <dt className="text-muted-foreground text-sm">
                                                    Bank
                                                </dt>
                                                <dd className="font-medium">
                                                    {employee.bank_name}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-muted-foreground text-sm">
                                                    Nomor Rekening
                                                </dt>
                                                <dd className="font-medium">
                                                    {
                                                        employee.bank_account_number
                                                    }
                                                </dd>
                                            </div>
                                            <div className="col-span-2">
                                                <dt className="text-muted-foreground text-sm">
                                                    Nama Pemilik
                                                </dt>
                                                <dd className="font-medium">
                                                    {employee.bank_account_name}
                                                </dd>
                                            </div>
                                        </dl>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="attendance">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Riwayat Absensi
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {attendances.length > 0 ? (
                                        <div className="space-y-2">
                                            {attendances
                                                .slice(0, 10)
                                                .map((attendance, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between border-b py-2"
                                                    >
                                                        <div>
                                                            <p className="font-medium">
                                                                {format(
                                                                    new Date(
                                                                        attendance.date,
                                                                    ),
                                                                    'dd MMM yyyy',
                                                                )}
                                                            </p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {
                                                                    attendance.clock_in
                                                                }{' '}
                                                                -{' '}
                                                                {attendance.clock_out ||
                                                                    'Belum Clock Out'}
                                                            </p>
                                                        </div>
                                                        <Badge
                                                            variant={
                                                                attendance.status ===
                                                                'present'
                                                                    ? 'success'
                                                                    : 'destructive'
                                                            }
                                                        >
                                                            {attendance.status}
                                                        </Badge>
                                                    </div>
                                                ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground py-8 text-center">
                                            Belum ada data absensi
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="leave">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Riwayat Cuti</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {leaveRequests.length > 0 ? (
                                        <div className="space-y-2">
                                            {leaveRequests.map(
                                                (leave, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between border-b py-2"
                                                    >
                                                        <div>
                                                            <p className="font-medium">
                                                                {
                                                                    leave
                                                                        .leave_type
                                                                        .name
                                                                }
                                                            </p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {format(
                                                                    new Date(
                                                                        leave.start_date,
                                                                    ),
                                                                    'dd MMM',
                                                                )}{' '}
                                                                -{' '}
                                                                {format(
                                                                    new Date(
                                                                        leave.end_date,
                                                                    ),
                                                                    'dd MMM yyyy',
                                                                )}
                                                            </p>
                                                        </div>
                                                        <Badge>
                                                            {leave.status}
                                                        </Badge>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground py-8 text-center">
                                            Belum ada riwayat cuti
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="overtime">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Riwayat Lembur</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {overtimeRequests.length > 0 ? (
                                        <div className="space-y-2">
                                            {overtimeRequests.map(
                                                (overtime, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between border-b py-2"
                                                    >
                                                        <div>
                                                            <p className="font-medium">
                                                                {format(
                                                                    new Date(
                                                                        overtime.date,
                                                                    ),
                                                                    'dd MMM yyyy',
                                                                )}
                                                            </p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {
                                                                    overtime.duration
                                                                }{' '}
                                                                jam -{' '}
                                                                {
                                                                    overtime.reason
                                                                }
                                                            </p>
                                                        </div>
                                                        <Badge>
                                                            {overtime.status}
                                                        </Badge>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground py-8 text-center">
                                            Belum ada riwayat lembur
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="payroll">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5" />
                                        Riwayat Gaji
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {payslips.length > 0 ? (
                                        <div className="space-y-2">
                                            {payslips.map((payslip, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between border-b py-2"
                                                >
                                                    <div>
                                                        <p className="font-medium">
                                                            {payslip.period}
                                                        </p>
                                                        <p className="text-muted-foreground text-sm">
                                                            Nett: Rp{' '}
                                                            {Number(
                                                                payslip.net_salary,
                                                            ).toLocaleString(
                                                                'id-ID',
                                                            )}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/payslips/${payslip.id}`}
                                                        >
                                                            Lihat
                                                        </Link>
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground py-8 text-center">
                                            Belum ada slip gaji
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AdminLayout>
    );
}
