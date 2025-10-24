import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface PayGroup {
    id: number;
    name: string;
    description?: string;
}

interface Employee {
    id: number;
    name: string;
    employee_number: string;
    department: { name: string };
    position: { name: string };
    base_salary: number;
}

interface PayRunWizardProps {
    payGroups: PayGroup[];
}

export default function PayRunWizard({ payGroups }: PayRunWizardProps) {
    const [step, setStep] = useState(1);
    const [employees] = useState<Employee[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

    const { data, setData, post, processing } = useForm({
        period: '',
        pay_date: undefined as Date | undefined,
        pay_group_id: '',
        employee_ids: [] as number[],
    });

    const handleNext = () => {
        if (step === 1) {
            // Fetch employees based on pay group
            // This would normally be an API call
            setStep(2);
        } else if (step === 2) {
            setData('employee_ids', selectedEmployees);
            setStep(3);
        }
    };

    const handleSubmit = () => {
        post('/admin/payruns');
    };

    const toggleEmployee = (id: number) => {
        setSelectedEmployees((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const toggleAll = () => {
        if (selectedEmployees.length === employees.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employees.map((e) => e.id));
        }
    };

    return (
        <AdminLayout title="Buat Payroll Baru">
            <Head title="Buat Payroll Baru" />

            <div className="mx-auto max-w-4xl space-y-6">
                {/* Progress Steps */}
                <div className="flex items-center justify-between">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-1 items-center">
                            <div
                                className={cn(
                                    'flex h-10 w-10 items-center justify-center rounded-full border-2',
                                    s === step
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : s < step
                                          ? 'border-green-500 bg-green-500 text-white'
                                          : 'border-muted bg-background',
                                )}
                            >
                                {s < step ? (
                                    <CheckCircle className="h-5 w-5" />
                                ) : (
                                    s
                                )}
                            </div>
                            {s < 3 && (
                                <div
                                    className={cn(
                                        'mx-2 h-1 flex-1',
                                        s < step ? 'bg-green-500' : 'bg-muted',
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Dasar</CardTitle>
                            <CardDescription>
                                Pilih periode dan grup gaji
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="period">Periode *</Label>
                                <Select
                                    value={data.period}
                                    onValueChange={(v) => setData('period', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Periode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2024-01">
                                            Januari 2024
                                        </SelectItem>
                                        <SelectItem value="2024-02">
                                            Februari 2024
                                        </SelectItem>
                                        <SelectItem value="2024-03">
                                            Maret 2024
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Tanggal Gaji *</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !data.pay_date &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {data.pay_date
                                                ? format(data.pay_date, 'PPP')
                                                : 'Pilih tanggal'}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={data.pay_date}
                                            onSelect={(date) =>
                                                setData('pay_date', date)
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <Label htmlFor="pay_group_id">
                                    Grup Gaji *
                                </Label>
                                <Select
                                    value={data.pay_group_id}
                                    onValueChange={(v) =>
                                        setData('pay_group_id', v)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Grup Gaji" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {payGroups.map((group) => (
                                            <SelectItem
                                                key={group.id}
                                                value={group.id.toString()}
                                            >
                                                {group.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleNext}
                                    disabled={
                                        !data.period ||
                                        !data.pay_date ||
                                        !data.pay_group_id
                                    }
                                >
                                    Lanjut
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Select Employees */}
                {step === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Pilih Pegawai</CardTitle>
                            <CardDescription>
                                Pilih pegawai yang akan digaji
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={
                                                selectedEmployees.length ===
                                                employees.length
                                            }
                                            onCheckedChange={toggleAll}
                                        />
                                        <Label>Pilih Semua</Label>
                                    </div>
                                    <Badge>
                                        {selectedEmployees.length} dari{' '}
                                        {employees.length} dipilih
                                    </Badge>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12"></TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Departemen</TableHead>
                                            <TableHead>Posisi</TableHead>
                                            <TableHead className="text-right">
                                                Gaji Pokok
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {employees.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedEmployees.includes(
                                                            employee.id,
                                                        )}
                                                        onCheckedChange={() =>
                                                            toggleEmployee(
                                                                employee.id,
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">
                                                            {employee.name}
                                                        </p>
                                                        <p className="text-muted-foreground text-sm">
                                                            {
                                                                employee.employee_number
                                                            }
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {employee.department.name}
                                                </TableCell>
                                                <TableCell>
                                                    {employee.position.name}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    Rp{' '}
                                                    {employee.base_salary.toLocaleString(
                                                        'id-ID',
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                >
                                    Kembali
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={selectedEmployees.length === 0}
                                >
                                    Lanjut
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Review & Konfirmasi</CardTitle>
                            <CardDescription>
                                Periksa kembali sebelum memproses
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Periode
                                        </Label>
                                        <p className="font-medium">
                                            {data.period}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Tanggal Gaji
                                        </Label>
                                        <p className="font-medium">
                                            {data.pay_date
                                                ? format(
                                                      data.pay_date,
                                                      'dd MMM yyyy',
                                                  )
                                                : '-'}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">
                                        Jumlah Pegawai
                                    </Label>
                                    <p className="font-medium">
                                        {selectedEmployees.length} orang
                                    </p>
                                </div>
                                <div className="bg-muted rounded-lg p-4">
                                    <p className="text-muted-foreground text-sm">
                                        Proses payroll akan menghitung gaji,
                                        tunjangan, potongan, dan menghasilkan
                                        slip gaji untuk semua pegawai yang
                                        dipilih.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep(2)}
                                >
                                    Kembali
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Memproses...'
                                        : 'Proses Payroll'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
