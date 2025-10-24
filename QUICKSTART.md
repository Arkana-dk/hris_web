# 🚀 Quick Start Guide - HRIS Backend

## Prerequisites

- ✅ PHP 8.2+
- ✅ MySQL 8.0+
- ✅ Composer
- ✅ Node.js & NPM

---

## Setup in 5 Minutes

### 1️⃣ Database Setup

```bash
# Start MySQL server
# Create database
mysql -u root -p
CREATE DATABASE human_resource_web;
EXIT;
```

### 2️⃣ Environment Configuration

Update `.env`:

```env
DB_DATABASE=human_resource_web
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 3️⃣ Install & Migrate

```bash
# Install dependencies (already done)
composer install

# Run migrations
php artisan migrate:fresh

# Seed data (optional)
php artisan db:seed

# Create storage link
php artisan storage:link
```

### 4️⃣ Create Admin User

```bash
php artisan tinker
```

```php
$user = App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@hris.com',
    'password' => Hash::make('password123')
]);
$user->assignRole('superadmin');
exit;
```

### 5️⃣ Start Development

```bash
# Start both Laravel & Vite
composer dev

# Or separately:
# Terminal 1: php artisan serve
# Terminal 2: npm run dev
```

---

## 🔐 Default Login

**Blade UI (Traditional):**

- URL: `http://localhost:8000/login`
- Email: `admin@hris.com`
- Password: `password123`

**React UI (SPA):**

- URL: `http://localhost:5173`
- Connect with backend API

---

## 📍 Important URLs

| URL                                        | Description     |
| ------------------------------------------ | --------------- |
| `http://localhost:8000`                    | Laravel Backend |
| `http://localhost:5173`                    | React Frontend  |
| `http://localhost:8000/admin/dashboard`    | Admin Panel     |
| `http://localhost:8000/employee/dashboard` | Employee Portal |

---

## 🎯 Main Features

### For Admin:

- Employee Management
- Attendance Reports
- Leave Approvals
- Payroll Processing
- System Settings

### For Employee:

- Clock In/Out
- Leave Requests
- View Payslips
- Update Profile
- View Work Schedule

---

## 📚 Documentation

- Full Setup: `BACKEND_SETUP.md`
- Integration Details: `INTEGRATION_SUMMARY.md`
- API Routes: Check `routes/web.php`

---

## 🆘 Troubleshooting

**Problem:** Database connection refused

```bash
# Check MySQL is running
# Update .env credentials
php artisan config:clear
```

**Problem:** Class not found

```bash
composer dump-autoload
php artisan optimize:clear
```

**Problem:** Permission denied

```bash
chmod -R 775 storage bootstrap/cache
```

---

## 🎉 You're Ready!

Backend sepenuhnya functional. Tinggal develop frontend React atau pakai Blade views yang sudah ada.

**Happy Coding! 🚀**
