# Backend Laravel HRIS - Setup Guide

## ✅ Backend Integration Completed

Backend Laravel dari repository **Arkana-dk/HRIS** telah berhasil diintegrasikan ke project ini!

### 📦 Yang Sudah Dicopy:

#### 1. **Application Layer** (`app/`)

- ✅ Models (Attendance, Employee, Department, LeaveRequest, PayRun, dll)
- ✅ Controllers (Admin, Employee, Superadmin, Api, Auth)
- ✅ Middleware (CheckRole, CheckEmployee, LogActivity, dll)
- ✅ Requests (Form validation)
- ✅ Providers (AppServiceProvider, FortifyServiceProvider)
- ✅ Console (Commands)
- ✅ Domain (Business logic)
- ✅ Exports (Excel exports)
- ✅ Imports (Excel imports)
- ✅ Policies (Authorization policies)

#### 2. **Routes**

- ✅ `routes/web.php` - Web routes untuk admin, employee, superadmin
- ✅ `routes/console.php` - Artisan commands
- ✅ `routes/settings.php` - Settings routes

#### 3. **Config Files**

- ✅ Semua config files di `config/` (auth, database, fortify, permission, dll)

#### 4. **Database**

- ✅ Migrations (40+ migration files untuk semua tabel HRIS)
- ✅ Seeders (DatabaseSeeder dengan data sample)
- ✅ Factories (User, Employee factories)

#### 5. **Views** (Blade Templates)

- ✅ Admin views (`resources/views/admin/`)
- ✅ Employee views (`resources/views/employee/`)
- ✅ Superadmin views (`resources/views/superadmin/`)
- ✅ Auth views (`resources/views/auth/`)
- ✅ Layouts (`resources/views/layouts/`)
- ✅ Components (`resources/views/components/`)

#### 6. **Public Assets**

- ✅ SBAdmin2 template (`public/sbadmin2/`)
- ✅ Images (`public/images/`)

#### 7. **Dependencies** (Updated `composer.json`)

```json
"barryvdh/laravel-dompdf": "^3.1",        // PDF Generation
"doctrine/dbal": "^4.3",                   // Database abstraction
"firebase/php-jwt": "^6.11",               // JWT tokens
"laravel/sanctum": "^4.1",                 // API authentication
"laravel/ui": "^4.6",                      // UI scaffolding
"maatwebsite/excel": "^3.1",               // Excel import/export
"spatie/laravel-permission": "^6.21"       // Role & Permission
```

---

## 🚀 Setup Instructions

### 1. **Database Setup**

Pastikan MySQL server running, lalu update `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=human_resource_web
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 2. **Run Migrations**

```bash
php artisan migrate:fresh
```

### 3. **Seed Database** (Optional - untuk data sample)

```bash
php artisan db:seed
```

### 4. **Generate IDE Helper** (Optional - untuk autocomplete)

```bash
php artisan ide-helper:generate
php artisan ide-helper:models -N
```

### 5. **Storage Link**

```bash
php artisan storage:link
```

### 6. **Start Development Server**

Backend (Laravel):

```bash
php artisan serve
```

Frontend (Vite + React):

```bash
npm run dev
```

Atau jalankan keduanya sekaligus:

```bash
composer dev
```

---

## 📋 Fitur Backend yang Tersedia

### 1. **Employee Management**

- Employee CRUD
- Employee documents
- Employee components (allowances, deductions)
- Employee work schedule

### 2. **Attendance System**

- Clock in/out
- Attendance requests (izin, sakit, WFH)
- Attendance summary & reports
- Location-based attendance

### 3. **Leave Management**

- Leave types (cuti tahunan, sakit, dll)
- Leave requests & approvals
- Leave entitlements
- Leave ledger

### 4. **Overtime Management**

- Overtime requests
- Overtime approvals
- Overtime calculations

### 5. **Payroll System**

- Pay components (earning, allowance, deduction, reimbursement)
- Pay groups
- Pay runs
- Payslip generation (PDF)
- Excel export

### 6. **Organization Structure**

- Departments
- Sections
- Positions
- Groups

### 7. **User & Role Management**

- Roles: superadmin, admin, employee
- Permissions (via Spatie Permission)

### 8. **Reports & Analytics**

- Attendance reports
- Leave reports
- Payroll reports
- Excel exports

---

## 🔐 Default Routes

### Admin Routes (prefix: `/admin`)

- Dashboard: `/admin/dashboard`
- Employees: `/admin/employees`
- Attendance: `/admin/attendance`
- Leave: `/admin/leave-requests`
- Payroll: `/admin/payruns`
- Settings: `/admin/settings/*`

### Employee Routes (prefix: `/employee`)

- Dashboard: `/employee/dashboard`
- My Attendance: `/employee/attendance`
- My Leave: `/employee/leave-requests`
- My Payslips: `/employee/payslips`
- Profile: `/employee/profile`

### Superadmin Routes (prefix: `/superadmin`)

- Dashboard: `/superadmin/dashboard`
- System Settings
- User Management

### Auth Routes

- Login: `/login`
- Register: `/register`
- Forgot Password: `/forgot-password`

---

## ⚙️ Environment Variables to Add

Tambahkan ke `.env` jika diperlukan:

```env
# Attendance Location Settings
ATTENDANCE_LOCATION_LAT=-6.200000
ATTENDANCE_LOCATION_LNG=106.816666
ATTENDANCE_LOCATION_RADIUS=500

# Payroll Settings
PAYROLL_CUTOFF_DAY=25
PAYROLL_PAYMENT_DAY=1

# Leave Settings
LEAVE_ANNUAL_DAYS=12
LEAVE_SICK_DAYS=999

# Mail Settings (untuk email notifications)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="noreply@hris.com"
MAIL_FROM_NAME="${APP_NAME}"
```

---

## 🔧 Next Steps

1. **Setup Database** - Jalankan MySQL dan run migrations
2. **Create Admin User** - Buat user pertama dengan role admin
3. **Configure Settings** - Sesuaikan settings di admin panel
4. **Test Features** - Coba semua fitur backend
5. **Integrate with React** - Connect frontend React dengan backend API

---

## 📚 Documentation

Untuk dokumentasi lebih lengkap, lihat:

- [Laravel Documentation](https://laravel.com/docs)
- [Spatie Permission](https://spatie.be/docs/laravel-permission)
- [Laravel Excel](https://docs.laravel-excel.com)
- [DomPDF](https://github.com/dompdf/dompdf)

---

## 🐛 Troubleshooting

### Error: "Class not found"

```bash
composer dump-autoload
```

### Error: "Permission denied"

```bash
chmod -R 775 storage bootstrap/cache
```

### Error: "SQLSTATE connection refused"

- Pastikan MySQL server running
- Check credentials di `.env`

---

## 📞 Support

Jika ada pertanyaan atau masalah, silakan check dokumentasi atau buat issue di repository.

---

**Happy Coding! 🚀**
