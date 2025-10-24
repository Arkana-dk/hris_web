import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/AdminLayout';
import { cn } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft, CalendarIcon } from 'lucide-react';

interface EmployeeFormProps {
    employee?: any;
    departments: Array<{ id: number; name: string }>;
    sections: Array<{ id: number; name: string; department_id: number }>;
    positions: Array<{ id: number; name: string }>;
    groups: Array<{ id: number; name: string }>;
}

export default function EmployeeForm({
    employee,
    departments,
    sections,
    positions,
    groups,
}: EmployeeFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        employee_number: employee?.employee_number || '',
        name: employee?.name || '',
        email: employee?.email || '',
        phone: employee?.phone || '',
        department_id: employee?.department_id || '',
        section_id: employee?.section_id || '',
        position_id: employee?.position_id || '',
        group_id: employee?.group_id || '',
        join_date: employee?.join_date
            ? new Date(employee.join_date)
            : undefined,
        status: employee?.status || 'active',
        address: employee?.address || '',
        bank_name: employee?.bank_name || '',
        bank_account_number: employee?.bank_account_number || '',
        bank_account_name: employee?.bank_account_name || '',
        identity_number: employee?.identity_number || '',
        tax_number: employee?.tax_number || '',
        avatar: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (value instanceof Date) {
                    formData.append(key, format(value, 'yyyy-MM-dd'));
                } else if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        if (employee) {
            post(`/admin/employees/${employee.id}`, {
                data: formData,
                forceFormData: true,
            });
        } else {
            post('/admin/employees', {
                data: formData,
                forceFormData: true,
            });
        }
    };

    const filteredSections = sections.filter(
        (s) => s.department_id === Number(data.department_id),
    );

    return (
        <AdminLayout title={employee ? 'Edit Pegawai' : 'Tambah Pegawai'}>
            <Head title={employee ? 'Edit Pegawai' : 'Tambah Pegawai'} />

            <div className="mb-4">
                <Button variant="outline" asChild>
                    <Link href="/admin/employees">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Link>
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Form */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Pribadi</CardTitle>
                                <CardDescription>
                                    Data pribadi pegawai
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="employee_number">
                                            Nomor Pegawai *
                                        </Label>
                                        <Input
                                            id="employee_number"
                                            value={data.employee_number}
                                            onChange={(e) =>
                                                setData(
                                                    'employee_number',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="EMP001"
                                        />
                                        {errors.employee_number && (
                                            <p className="text-destructive mt-1 text-sm">
                                                {errors.employee_number}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="name">
                                            Nama Lengkap *
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            placeholder="John Doe"
                                        />
                                        {errors.name && (
                                            <p className="text-destructive mt-1 text-sm">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-destructive mt-1 text-sm">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">
                                            No. Telepon
                                        </Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            placeholder="081234567890"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="identity_number">
                                            NIK
                                        </Label>
                                        <Input
                                            id="identity_number"
                                            value={data.identity_number}
                                            onChange={(e) =>
                                                setData(
                                                    'identity_number',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="1234567890123456"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="tax_number">NPWP</Label>
                                        <Input
                                            id="tax_number"
                                            value={data.tax_number}
                                            onChange={(e) =>
                                                setData(
                                                    'tax_number',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="12.345.678.9-123.000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="address">Alamat</Label>
                                    <Textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData('address', e.target.value)
                                        }
                                        placeholder="Alamat lengkap"
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Organization */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Kepegawaian</CardTitle>
                                <CardDescription>
                                    Data organisasi dan posisi
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="department_id">
                                            Departemen *
                                        </Label>
                                        <Select
                                            value={data.department_id.toString()}
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
                                        <Label htmlFor="section_id">
                                            Seksi
                                        </Label>
                                        <Select
                                            value={data.section_id.toString()}
                                            onValueChange={(v) =>
                                                setData('section_id', v)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Seksi" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredSections.map(
                                                    (section) => (
                                                        <SelectItem
                                                            key={section.id}
                                                            value={section.id.toString()}
                                                        >
                                                            {section.name}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="position_id">
                                            Posisi *
                                        </Label>
                                        <Select
                                            value={data.position_id.toString()}
                                            onValueChange={(v) =>
                                                setData('position_id', v)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Posisi" />
                                            </SelectTrigger>
                                            <SelectContent>
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
                                        {errors.position_id && (
                                            <p className="text-destructive mt-1 text-sm">
                                                {errors.position_id}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="group_id">Grup</Label>
                                        <Select
                                            value={data.group_id.toString()}
                                            onValueChange={(v) =>
                                                setData('group_id', v)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Grup" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {groups.map((group) => (
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
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label>Tanggal Masuk *</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        'w-full justify-start text-left font-normal',
                                                        !data.join_date &&
                                                            'text-muted-foreground',
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {data.join_date
                                                        ? format(
                                                              data.join_date,
                                                              'PPP',
                                                          )
                                                        : 'Pilih tanggal'}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={data.join_date}
                                                    onSelect={(date) =>
                                                        setData(
                                                            'join_date',
                                                            date,
                                                        )
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div>
                                        <Label htmlFor="status">Status *</Label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(v) =>
                                                setData('status', v)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
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
                            </CardContent>
                        </Card>

                        {/* Bank Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Bank</CardTitle>
                                <CardDescription>
                                    Data rekening untuk transfer gaji
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="bank_name">Nama Bank</Label>
                                    <Input
                                        id="bank_name"
                                        value={data.bank_name}
                                        onChange={(e) =>
                                            setData('bank_name', e.target.value)
                                        }
                                        placeholder="BCA, Mandiri, dll"
                                    />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="bank_account_number">
                                            Nomor Rekening
                                        </Label>
                                        <Input
                                            id="bank_account_number"
                                            value={data.bank_account_number}
                                            onChange={(e) =>
                                                setData(
                                                    'bank_account_number',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="1234567890"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="bank_account_name">
                                            Nama Pemilik Rekening
                                        </Label>
                                        <Input
                                            id="bank_account_name"
                                            value={data.bank_account_name}
                                            onChange={(e) =>
                                                setData(
                                                    'bank_account_name',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nama sesuai rekening"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Avatar */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Foto Profil</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                <Avatar className="h-32 w-32">
                                    <AvatarFallback className="text-4xl">
                                        {data.name
                                            ? data.name.charAt(0).toUpperCase()
                                            : 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="w-full">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData(
                                                'avatar',
                                                e.target.files?.[0] || null,
                                            )
                                        }
                                    />
                                    <p className="text-muted-foreground mt-1 text-xs">
                                        Max 2MB. Format: JPG, PNG
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardContent className="space-y-2 pt-6">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Menyimpan...'
                                        : employee
                                          ? 'Update Pegawai'
                                          : 'Simpan Pegawai'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    asChild
                                >
                                    <Link href="/admin/employees">Batal</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
