import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Calendar,
    CalendarClock,
    Clock,
    DollarSign,
    TrendingDown,
    TrendingUp,
    UserCheck,
    Users,
    UserX,
} from 'lucide-react';

interface DashboardStats {
    totalEmployees: number;
    activeEmployees: number;
    inactiveEmployees: number;
    probationEmployees: number;
    todayPresent: number;
    todayAbsent: number;
    todayLate: number;
    pendingLeaveRequests: number;
    approvedLeaveRequests: number;
    pendingOvertimeRequests: number;
    thisMonthPayroll: number;
    lastMonthPayroll: number;
}

interface RecentActivity {
    id: number;
    type: 'attendance' | 'leave' | 'overtime' | 'employee';
    title: string;
    description: string;
    time: string;
    user: {
        name: string;
        avatar?: string;
    };
}

interface DashboardProps {
    stats: DashboardStats;
    recentActivities: RecentActivity[];
}

export default function AdminDashboard({
    stats,
    recentActivities,
}: DashboardProps) {
    const payrollChange = stats.thisMonthPayroll - stats.lastMonthPayroll;
    const payrollChangePercent = (
        (payrollChange / stats.lastMonthPayroll) *
        100
    ).toFixed(1);

    const attendanceRate = (
        (stats.todayPresent / stats.activeEmployees) *
        100
    ).toFixed(1);

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />

            {/* Welcome Section */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight">
                    Selamat Datang di HRIS System
                </h2>
                <p className="text-muted-foreground">
                    Ringkasan aktivitas dan data pegawai hari ini
                </p>
            </div>

            {/* Stats Cards */}
            <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Employees */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Pegawai
                        </CardTitle>
                        <Users className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.totalEmployees}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs">
                            <Badge variant="default">
                                {stats.activeEmployees} Aktif
                            </Badge>
                            <Badge variant="secondary">
                                {stats.probationEmployees} Probation
                            </Badge>
                        </div>
                        <Button
                            variant="link"
                            className="mt-2 h-auto p-0"
                            asChild
                        >
                            <Link href="/admin/employees">
                                Lihat Semua{' '}
                                <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Attendance Today */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Kehadiran Hari Ini
                        </CardTitle>
                        <Clock className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.todayPresent}
                        </div>
                        <div className="text-muted-foreground mt-2 text-xs">
                            Tingkat Kehadiran: {attendanceRate}%
                        </div>
                        <Progress
                            value={parseFloat(attendanceRate)}
                            className="mt-2"
                        />
                        <div className="mt-2 flex items-center gap-2 text-xs">
                            <div className="flex items-center text-green-600">
                                <UserCheck className="mr-1 h-3 w-3" />
                                {stats.todayPresent} Hadir
                            </div>
                            <div className="flex items-center text-yellow-600">
                                <CalendarClock className="mr-1 h-3 w-3" />
                                {stats.todayLate} Terlambat
                            </div>
                            <div className="flex items-center text-red-600">
                                <UserX className="mr-1 h-3 w-3" />
                                {stats.todayAbsent} Tidak Hadir
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Leave Requests */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Request Cuti
                        </CardTitle>
                        <Calendar className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.pendingLeaveRequests}
                        </div>
                        <p className="text-muted-foreground text-xs">
                            Menunggu persetujuan
                        </p>
                        <div className="mt-3 flex items-center justify-between text-xs">
                            <span>Disetujui bulan ini:</span>
                            <Badge variant="outline">
                                {stats.approvedLeaveRequests}
                            </Badge>
                        </div>
                        <Button
                            variant="link"
                            className="mt-2 h-auto p-0"
                            asChild
                        >
                            <Link href="/admin/leave-requests">
                                Review Request{' '}
                                <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Payroll */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Penggajian Bulan Ini
                        </CardTitle>
                        <DollarSign className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            Rp {stats.thisMonthPayroll.toLocaleString('id-ID')}
                        </div>
                        <div className="mt-2 flex items-center text-xs">
                            {payrollChange >= 0 ? (
                                <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                            ) : (
                                <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                            )}
                            <span
                                className={
                                    payrollChange >= 0
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }
                            >
                                {payrollChangePercent}%
                            </span>
                            <span className="text-muted-foreground ml-1">
                                dari bulan lalu
                            </span>
                        </div>
                        <Button
                            variant="link"
                            className="mt-2 h-auto p-0"
                            asChild
                        >
                            <Link href="/admin/payruns">
                                Kelola Payroll{' '}
                                <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Activities */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Aktivitas Terbaru</CardTitle>
                        <CardDescription>
                            Update terkini dari sistem
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="hover:bg-muted/50 flex items-start gap-4 rounded-lg border p-4 transition-colors"
                                >
                                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                                        {activity.type === 'attendance' && (
                                            <Clock className="text-primary h-5 w-5" />
                                        )}
                                        {activity.type === 'leave' && (
                                            <Calendar className="text-primary h-5 w-5" />
                                        )}
                                        {activity.type === 'overtime' && (
                                            <CalendarClock className="text-primary h-5 w-5" />
                                        )}
                                        {activity.type === 'employee' && (
                                            <Users className="text-primary h-5 w-5" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium">
                                                    {activity.title}
                                                </p>
                                                <p className="text-muted-foreground text-sm">
                                                    {activity.description}
                                                </p>
                                                <p className="text-muted-foreground mt-1 text-xs">
                                                    {activity.user.name}
                                                </p>
                                            </div>
                                            <span className="text-muted-foreground text-xs">
                                                {activity.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Akses cepat ke fitur utama
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/admin/employees/create">
                                <Users className="mr-2 h-4 w-4" />
                                Tambah Pegawai Baru
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/admin/attendance-summary">
                                <Clock className="mr-2 h-4 w-4" />
                                Lihat Ringkasan Presensi
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/admin/leave-requests">
                                <Calendar className="mr-2 h-4 w-4" />
                                Review Request Cuti
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/admin/payruns/create">
                                <DollarSign className="mr-2 h-4 w-4" />
                                Proses Payroll Baru
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/admin/overtime-requests">
                                <CalendarClock className="mr-2 h-4 w-4" />
                                Review Request Lembur
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Pending Approvals */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Menunggu Persetujuan</CardTitle>
                        <CardDescription>
                            Request yang membutuhkan perhatian Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        Cuti
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {stats.pendingLeaveRequests}
                                    </p>
                                </div>
                                <Button size="sm" asChild>
                                    <Link href="/admin/leave-requests?status=pending">
                                        Review
                                    </Link>
                                </Button>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        Lembur
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {stats.pendingOvertimeRequests}
                                    </p>
                                </div>
                                <Button size="sm" asChild>
                                    <Link href="/admin/overtime-requests?status=pending">
                                        Review
                                    </Link>
                                </Button>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        Presensi
                                    </p>
                                    <p className="text-2xl font-bold">0</p>
                                </div>
                                <Button size="sm" asChild>
                                    <Link href="/admin/attendance-requests">
                                        Review
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
