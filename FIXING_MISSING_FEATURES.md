# PANDUAN LENGKAP: Perbaikan Fitur yang Hilang

## 🔑 AKUN LOGIN

### Super Admin

- **Email**: `superadmin@gmail.com`
- **Password**: `poweradmin`
- **Akses**: Semua fitur (HR + Payroll + System Management)

### Payroll Admin

- **Email**: `admin@gmail.com`
- **Password**: `admin123`
- **Akses**: Dashboard Admin + Payroll (Pay Runs, Pay Groups, Components, Rates)

### HR Admin

- **Email**: `hradmin@gmail.com`
- **Password**: `hradmin123`
- **Akses**: Dashboard Admin + HR (Employees, Attendance, Leave, Overtime, Organization)

### HR Staff

- **Email**: `hrstaff@gmail.com`
- **Password**: `hrstaff123`
- **Akses**: Dashboard Admin + HR (terbatas, tidak bisa manage organization)

### Payroll Staff

- **Email**: `payrollstaff@gmail.com`
- **Password**: `payrollstaff123`
- **Akses**: Dashboard Admin + Payroll (bisa simulate tapi tidak bisa finalize)

### System Admin

- **Email**: `systemadmin@gmail.com`
- **Password**: `systemadmin123`
- **Akses**: Dashboard Admin + User/Role/Permission Management

### Employee

- **Email**: `employee@gmail.com`
- **Password**: `employee123`
- **Akses**: Employee Dashboard (attendance, leave, overtime, payslip)

---

## ✅ YANG SUDAH DIPERBAIKI

1. ✅ **AuthController** - Updated to Inertia with Spatie roles redirect
2. ✅ **DashboardController** - Updated to Inertia render Admin/Dashboard
3. ✅ **DepartmentController** - Updated to Inertia (already done)
4. ✅ **SectionController** - Updated to Inertia (already done)
5. ✅ **PayRunWizardController index()** - Updated to Inertia render Admin/Payruns/Index

---

## 🔧 YANG MASIH PERLU DIPERBAIKI (BLADE → INERTIA)

### Critical Controllers (Payroll & HR Core):

#### 1. EmployeeController (HR Admin Core)

**File**: `app/Http/Controllers/Admin/EmployeeController.php`
**Methods to update**:

- `index()` line 86: `view('admin.pages.employee.index')` → `Inertia::render('Admin/Employees/Index')`
- `show()` line 94: `view('admin.pages.employee.show')` → `Inertia::render('Admin/Employees/Show')`
- `create()` line 125: `view('admin.pages.employee.create')` → `Inertia::render('Admin/Employees/Form')`
- `edit()` line 244: `view('admin.pages.employee.edit')` → `Inertia::render('Admin/Employees/Form')`

#### 2. AttendanceController (HR Staff Core)

**File**: `app/Http/Controllers/Admin/AttendanceController.php`
**Methods to update**:

- `index()` line 21: `view('admin.pages.attendance.index')` → `Inertia::render('Admin/Attendances/Index')`
- `show()` line 26: `view('admin.pages.attendance.show')` → bisa redirect atau API
- `edit()` line 41: `view('admin.pages.attendance.edit')` → modal/inline edit

#### 3. LeaveRequestController (HR Feature)

**File**: `app/Http/Controllers/Admin/LeaveRequestController.php`
**Update**: `index()` → `Inertia::render('Admin/LeaveRequests/Index')`

#### 4. OvertimeRequestController (HR Feature)

**File**: `app/Http/Controllers/Admin/OvertimeRequestController.php`
**Update**: `index()` → `Inertia::render('Admin/OvertimeRequests/Index')`

#### 5. PositionController (Organization)

**File**: `app/Http/Controllers/Admin/PositionController.php`
**Update**: `index()` → `Inertia::render('Admin/Positions/Index')`

#### 6. GroupController (Organization)

**File**: `app/Http/Controllers/Admin/GroupController.php`
**Update**: `index()` → `Inertia::render('Admin/Groups/Index')`

#### 7. ShiftController (Attendance Management)

**File**: `app/Http/Controllers/Admin/ShiftController.php`
**Update**: `index()` → `Inertia::render('Admin/Shifts/Index')`

---

## 📋 SCRIPT AUTO-FIX (RUN DI TERMINAL)

Simpan script ini sebagai `fix-controllers.sh` dan jalankan:

```bash
#!/bin/bash

# Navigate to project
cd /c/Users/ACER/Documents/web/hris-react/hris-react

# Backup controllers first
cp -r app/Http/Controllers app/Http/Controllers.backup

# Fix AttendanceController
sed -i "s|return view('admin.pages.attendance.index'|return \\\\Inertia\\\\Inertia::render('Admin/Attendances/Index'|g" app/Http/Controllers/Admin/AttendanceController.php

# Fix PositionController
sed -i "s|return view('admin.pages.position.index'|return \\\\Inertia\\\\Inertia::render('Admin/Positions/Index'|g" app/Http/Controllers/Admin/PositionController.php

# Fix GroupController
sed -i "s|return view('admin.pages.group.index'|return \\\\Inertia\\\\Inertia::render('Admin/Groups/Index'|g" app/Http/Controllers/Admin/GroupController.php

# Fix LeaveRequestController
sed -i "s|return view('admin.pages.leave-request.index'|return \\\\Inertia\\\\Inertia::render('Admin/LeaveRequests/Index'|g" app/Http/Controllers/Admin/LeaveRequestController.php

# Fix OvertimeRequestController
sed -i "s|return view('admin.pages.overtime-request.index'|return \\\\Inertia\\\\Inertia::render('Admin/OvertimeRequests/Index'|g" app/Http/Controllers/Admin/OvertimeRequestController.php

# Fix ShiftController
sed -i "s|return view('admin.pages.shift.index'|return \\\\Inertia\\\\Inertia::render('Admin/Shifts/Index'|g" app/Http/Controllers/Admin/ShiftController.php

echo "✅ Controllers updated! Check app/Http/Controllers.backup if you need to rollback"
```

Jalankan:

```bash
chmod +x fix-controllers.sh
./fix-controllers.sh
```

---

## 🎯 PRIORITAS PERBAIKAN

### HIGH PRIORITY (Hari ini):

1. ✅ **AuthController** - DONE
2. ✅ **DashboardController** - DONE
3. ✅ **PayRunWizardController** - DONE (index)
4. **EmployeeController** - IN PROGRESS (critical untuk HR Admin)
5. **AttendanceController** - IN PROGRESS (critical untuk HR Staff)

### MEDIUM PRIORITY (Besok):

6. **LeaveRequestController**
7. **OvertimeRequestController**
8. **PositionController**
9. **GroupController**

### LOW PRIORITY (Optional):

10. **ShiftController**
11. Other administrative controllers

---

## 🧪 CARA TEST

1. **Login sebagai Super Admin**:

    ```
    Email: superadmin@gmail.com
    Password: poweradmin
    ```

2. **Cek Dashboard**: Seharusnya muncul React component, bukan Blade template lama

3. **Cek Menu Payroll**:
    - Pay Runs → Admin/Payruns/Index (sudah Inertia)
    - Pay Groups → Masih Blade (perlu update)
    - Pay Components → Masih Blade (perlu update)

4. **Cek Menu HR**:
    - Employees → Perlu update ke Inertia
    - Attendance → Perlu update ke Inertia
    - Leave Requests → Perlu update ke Inertia

---

## 🔍 DEBUGGING

Jika fitur masih missing:

1. **Cek Browser Console** (F12): Lihat error JavaScript
2. **Cek Laravel Log**: `storage/logs/laravel.log`
3. **Cek Permission**: User punya permission yang benar?

    ```bash
    php artisan tinker
    $user = User::where('email', 'superadmin@gmail.com')->first();
    $user->getAllPermissions()->pluck('name');
    ```

4. **Cek Route**: Apakah route terdaftar?
    ```bash
    php artisan route:list | grep admin.payrun
    ```

---

## 💡 CATATAN PENTING

- **Super Admin** punya akses ke SEMUA fitur (bypass permission check)
- **Payroll features** butuh permission: `payroll.run.view`, `payroll.group.manage`, dll
- **HR features** butuh permission: `hr.employee.view_basic`, `hr.attendance.view`, dll
- Permissions di-seed oleh **PermissionsSeeder** dan **RoleUserSeeder**

---

## 📞 NEXT STEPS

1. Saya akan update EmployeeController sekarang
2. Kemudian AttendanceController
3. Lalu LeaveRequestController & OvertimeRequestController
4. Test semua fitur dengan masing-masing role
5. Dokumentasikan permission matrix

Mau saya lanjutkan update controller-controller ini sekarang?
