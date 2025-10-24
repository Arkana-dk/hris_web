# HRIS Setup Guide - Laravel Backend

## 📋 Overview

Semua backend sudah terintegrasi dari repository Arkana-dk/HRIS:

- ✅ Routes: `routes/web.php` (lengkap dengan permissions)
- ✅ Controllers: 43 controllers di `app/Http/Controllers/Admin/`
- ✅ Models: 41 models di `app/Models/`
- ✅ Migrations: 63 migrations di `database/migrations/`
- ✅ Seeders: 22 seeders di `database/seeders/`

## 🚀 Quick Start

### 1. Setup Database

```bash
# Edit .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hris_react
DB_USERNAME=root
DB_PASSWORD=

# Buat database
mysql -u root -p
CREATE DATABASE hris_react CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 2. Run Migrations

```bash
# Jalankan semua migrations
php artisan migrate

# Atau fresh migrate (hapus semua data)
php artisan migrate:fresh
```

### 3. Run Seeders

```bash
# Seed semua data
php artisan db:seed

# Atau seed spesifik seeder
php artisan db:seed --class=PermissionsSeeder
php artisan db:seed --class=RoleUserSeeder
php artisan db:seed --class=UsersAndEmployeesSeeder
php artisan db:seed --class=DepartmentSectionPositionSeeder
php artisan db:seed --class=EmployeeSeeder
php artisan db:seed --class=ShiftSeeder
php artisan db:seed --class=LeaveTypeSeeder
php artisan db:seed --class=AttendanceSeeder
php artisan db:seed --class=LeaveRequestSeeder
php artisan db:seed --class=OvertimeSeeder
php artisan db:seed --class=PayComponentsAndRatesSeeder

# Fresh migrate + seed sekaligus
php artisan migrate:fresh --seed
```

### 4. Default Users After Seeding

Setelah seed, Anda bisa login dengan:

**Super Admin:**

- Email: `superadmin@hris.test`
- Password: `password`

**Admin HR:**

- Email: `admin@hris.test`
- Password: `password`

**Employee:**

- Email: `employee@hris.test`
- Password: `password`

## 🔧 Modifikasi Controllers untuk Inertia

Controllers saat ini menggunakan `view()` untuk Blade. Perlu diubah ke Inertia:

### Contoh Perubahan

**Sebelum (Blade):**

```php
public function index(Request $request)
{
    $departments = Department::withCount('employees')
        ->paginate(10);

    return view('admin.pages.department.index', compact('departments'));
}
```

**Sesudah (Inertia):**

```php
use Inertia\Inertia;

public function index(Request $request)
{
    $departments = Department::withCount('employees')
        ->paginate(10);

    return Inertia::render('Admin/Departments/Index', [
        'departments' => $departments,
    ]);
}
```

### Controllers Yang Perlu Diubah

Berikut controllers yang perlu diubah untuk Inertia (15 controllers untuk pages yang sudah dibuat):

1. **DepartmentController** → `Admin/Departments/Index`
2. **SectionController** → `Admin/Sections/Index`
3. **PositionController** → `Admin/Positions/Index`
4. **GroupController** → `Admin/Groups/Index`
5. **EmployeeController** → `Admin/Employees/Index`, `Form`, `Show`
6. **AttendanceController** → `Admin/Attendances/Index`
7. **LeaveRequestController** → `Admin/LeaveRequests/Index`
8. **OvertimeRequestController** → `Admin/OvertimeRequests/Index`
9. **PayRunWizardController** → `Admin/Payruns/Index`, `Create`
10. **ShiftController** → `Admin/Shifts/Index`
11. **DashboardController** → `Admin/Dashboard`

## 📝 Update Controller Script

Saya akan buatkan script untuk mengupdate controllers secara otomatis. Namun untuk sementara, berikut contoh manual:

### DepartmentController.php

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');

        $departments = Department::query()
            ->withCount('employees')
            ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Departments/Index', [
            'departments' => $departments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name',
            'code' => 'required|string|max:50|unique:departments,code',
            'description' => 'nullable|string',
        ]);

        Department::create($validated);

        return back()->with('success', 'Departemen berhasil ditambahkan.');
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name,' . $department->id,
            'code' => 'required|string|max:50|unique:departments,code,' . $department->id,
            'description' => 'nullable|string',
        ]);

        $department->update($validated);

        return back()->with('success', 'Departemen berhasil diperbarui.');
    }

    public function destroy(Department $department)
    {
        if ($department->employees()->exists()) {
            return back()->withErrors([
                'error' => 'Tidak bisa menghapus: masih ada pegawai di departemen ini.'
            ]);
        }

        $department->delete();

        return back()->with('success', 'Departemen berhasil dihapus.');
    }
}
```

## 🗄️ Database Structure

### Main Tables:

- **users** - User accounts (admin, employee)
- **employees** - Employee data (linked to users)
- **departments** - Organization departments
- **sections** - Sub-divisions within departments
- **positions** - Job positions
- **groups** - Employee groups
- **shifts** - Work shifts
- **attendances** - Daily attendance records
- **leave_requests** - Leave applications
- **leave_types** - Types of leaves
- **overtime_requests** - Overtime applications
- **pay_runs** - Payroll runs
- **pay_run_details** - Individual payslips
- **pay_components** - Salary components (allowances, deductions)

### Permissions & Roles:

Setelah seeding, sistem memiliki:

- **Roles**: super-admin, system-admin, hr-manager, hr-admin, employee
- **Permissions**: 50+ permissions untuk berbagai modul

## 📊 Sample Data After Seeding

### Departments (10):

- IT (Information Technology)
- HR (Human Resources)
- Finance
- Marketing
- Operations
- Sales
- Customer Service
- Production
- Quality Assurance
- Research & Development

### Employees (50+):

- 5-10 employees per department
- Complete with positions, sections, groups
- Random join dates
- Dummy bank accounts

### Attendance (last 30 days):

- Clock in/out times
- Late arrivals
- Early departures
- Status tracking

### Leave Types:

- Annual Leave (12 days)
- Sick Leave (10 days)
- Marriage Leave (3 days)
- Maternity Leave (90 days)
- Paternity Leave (2 days)
- Unpaid Leave

### Shifts:

- Morning Shift (08:00-17:00)
- Afternoon Shift (13:00-22:00)
- Night Shift (22:00-07:00)

## 🧪 Testing

### Test Login:

```bash
# Start development server
php artisan serve

# Visit: http://localhost:8000/login
# Login with: superadmin@hris.test / password
```

### Test API Endpoints:

```bash
# Get departments (requires auth)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8000/admin/departments

# Create department
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"name":"Engineering","code":"ENG"}' \
     http://localhost:8000/admin/departments
```

## 🔐 Permissions Matrix

| Module       | View                   | Create             | Edit               | Delete             | Approve               |
| ------------ | ---------------------- | ------------------ | ------------------ | ------------------ | --------------------- |
| Employees    | hr.employee.view_basic | hr.employee.manage | hr.employee.manage | hr.employee.manage | -                     |
| Attendance   | hr.attendance.view     | -                  | -                  | -                  | hr.attendance.approve |
| Leave        | hr.employee.view_basic | -                  | -                  | -                  | hr.attendance.approve |
| Overtime     | hr.employee.view_basic | -                  | -                  | -                  | hr.attendance.approve |
| Payroll      | payroll.run.view       | payroll.run.create | -                  | -                  | payroll.run.finalize  |
| Organization | org.manage             | org.manage         | org.manage         | org.manage         | -                     |
| Shifts       | shift.manage           | shift.manage       | shift.manage       | shift.manage       | -                     |

## 📁 File Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Admin/
│   │   │   ├── DashboardController.php
│   │   │   ├── EmployeeController.php
│   │   │   ├── DepartmentController.php
│   │   │   ├── AttendanceController.php
│   │   │   ├── LeaveRequestController.php
│   │   │   ├── OvertimeRequestController.php
│   │   │   ├── PayRunWizardController.php
│   │   │   ├── ShiftController.php
│   │   │   └── ... (35 more controllers)
│   │   └── Employee/
│   └── Middleware/
├── Models/
│   ├── User.php
│   ├── Employee.php
│   ├── Department.php
│   ├── Attendance.php
│   └── ... (37 more models)
database/
├── migrations/
│   └── ... (63 migration files)
├── seeders/
│   ├── DatabaseSeeder.php
│   ├── PermissionsSeeder.php
│   ├── RoleUserSeeder.php
│   ├── UsersAndEmployeesSeeder.php
│   ├── DepartmentSectionPositionSeeder.php
│   └── ... (17 more seeders)
resources/
├── js/
│   ├── pages/
│   │   └── Admin/
│   │       ├── Dashboard.tsx
│   │       ├── Employees/
│   │       ├── Departments/
│   │       ├── Attendances/
│   │       └── ... (15 pages total)
└── views/
    └── admin/
        └── pages/
            └── ... (136 Blade files - legacy)
routes/
├── web.php (comprehensive admin + employee routes)
└── settings.php
```

## 🚨 Important Notes

1. **Middleware Protection**: Semua routes admin dilindungi dengan `auth:web` middleware
2. **Permission Check**: Banyak routes memerlukan permission spesifik (via Spatie Permission)
3. **Blade to Inertia**: Controllers masih mengembalikan Blade views, perlu diubah ke Inertia
4. **API Routes**: Belum ada routes API, semua menggunakan web routes dengan Inertia

## 🔄 Next Steps

1. ✅ Database sudah siap (migrations + seeders lengkap)
2. ✅ Routes sudah lengkap di `web.php`
3. ✅ Controllers sudah ada (43 controllers)
4. ⚠️ **TODO**: Update controllers untuk return Inertia response
5. ⚠️ **TODO**: Test semua CRUD operations
6. ⚠️ **TODO**: Setup file upload untuk avatar/documents

## 📞 Support

Jika ada error saat migration/seeding:

```bash
# Clear cache
php artisan config:clear
php artisan cache:clear
php artisan route:clear

# Rebuild autoload
composer dump-autoload

# Fresh start
php artisan migrate:fresh --seed
```

---

**Last Updated**: January 2025
**Backend Source**: Arkana-dk/HRIS (fully integrated)
**Frontend**: React + TypeScript + Inertia.js
**Database**: MySQL 8.0+
