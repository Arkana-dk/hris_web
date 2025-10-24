import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
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
import { cn } from '@/lib/utils';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    Calendar as CalendarIcon,
    Clock,
    FileDown,
    Search,
} from 'lucide-react';
import { useState } from 'react';

interface Attendance {
    id: number;
    employee: {
        name: string;
        employee_number: string;
    };
    date: string;
    clock_in: string;
    clock_out?: string;
    status: 'present' | 'late' | 'absent' | 'half_day';
    late_duration?: number;
    notes?: string;
}

interface AttendancesIndexProps {
    attendances: {
        data: Attendance[];
        current_page: number;
        last_page: number;
        total: number;
    };
    stats: {
        present: number;
        late: number;
        absent: number;
        on_leave: number;
    };
    departments: Array<{ id: number; name: string }>;
}

export default function AttendancesIndex({
    attendances,
    stats,
    departments,
}: AttendancesIndexProps) {
    const [search, setSearch] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState<Date>(new Date());

    const handleFilter = () => {
        router.get(
            '/admin/attendances',
            {
                search,
                department,
                status,
                date: format(date, 'yyyy-MM-dd'),
            },
            { preserveState: true },
        );
    };

    const handleExport = () => {
        window.location.href = `/admin/attendances/export?date=${format(date, 'yyyy-MM-dd')}`;
    };

    const statusColors: Record<
        string,
        'success' | 'warning' | 'destructive' | 'secondary'
    > = {
        present: 'success',
        late: 'warning',
        absent: 'destructive',
        half_day: 'secondary',
    };

    return (
        <AdminLayout title="Absensi">
            <Head title="Absensi" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Absensi</h1>
                        <p className="text-muted-foreground">
                            Kelola data absensi pegawai
                        </p>
                    </div>
                    <Button onClick={handleExport}>
                        <FileDown className="mr-2 h-4 w-4" />
                        Export Excel
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Hadir
                            </CardTitle>
                            <Clock className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {stats.present}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Pegawai hadir hari ini
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Terlambat
                            </CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">
                                {stats.late}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Pegawai terlambat
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Tidak Hadir
                            </CardTitle>
                            <Clock className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {stats.absent}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Pegawai tidak hadir
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Cuti/Izin
                            </CardTitle>
                            <Clock className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {stats.on_leave}
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Pegawai cuti/izin
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid gap-4 md:grid-cols-5">
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
                                    <SelectItem value="present">
                                        Hadir
                                    </SelectItem>
                                    <SelectItem value="late">
                                        Terlambat
                                    </SelectItem>
                                    <SelectItem value="absent">
                                        Tidak Hadir
                                    </SelectItem>
                                    <SelectItem value="half_day">
                                        Half Day
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            'justify-start text-left font-normal',
                                            !date && 'text-muted-foreground',
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date
                                            ? format(date, 'PPP')
                                            : 'Pilih tanggal'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(d) => d && setDate(d)}
                                    />
                                </PopoverContent>
                            </Popover>
                            <Button onClick={handleFilter}>
                                Terapkan Filter
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Pegawai</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Clock In</TableHead>
                                    <TableHead>Clock Out</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Terlambat</TableHead>
                                    <TableHead>Keterangan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendances.data.length > 0 ? (
                                    attendances.data.map((attendance) => (
                                        <TableRow key={attendance.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarFallback>
                                                            {attendance.employee.name.charAt(
                                                                0,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">
                                                            {
                                                                attendance
                                                                    .employee
                                                                    .name
                                                            }
                                                        </p>
                                                        <p className="text-muted-foreground text-sm">
                                                            {
                                                                attendance
                                                                    .employee
                                                                    .employee_number
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {format(
                                                    new Date(attendance.date),
                                                    'dd MMM yyyy',
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {attendance.clock_in}
                                            </TableCell>
                                            <TableCell>
                                                {attendance.clock_out || '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        statusColors[
                                                            attendance.status
                                                        ]
                                                    }
                                                >
                                                    {attendance.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {attendance.late_duration ? (
                                                    <span className="text-destructive">
                                                        {
                                                            attendance.late_duration
                                                        }{' '}
                                                        menit
                                                    </span>
                                                ) : (
                                                    '-'
                                                )}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {attendance.notes || '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-muted-foreground py-8 text-center"
                                        >
                                            Tidak ada data absensi
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
