# 🎨 UI Components - React + Shadcn UI

## ✅ Conversion Status

Backend Laravel (Blade Views) → Frontend React (Shadcn UI) telah dimulai!

---

## 📦 Components yang Sudah Dibuat

### **1. Layouts**

#### **AdminLayout.tsx**

Layout utama untuk Admin Panel dengan:

- ✅ Sidebar navigasi lengkap dengan menu hierarki
- ✅ Header dengan notifikasi dan user dropdown
- ✅ Responsive mobile-friendly
- ✅ Menggunakan Shadcn Sidebar component
- ✅ Avatar, Badge, DropdownMenu, Button

**Features:**

- Auto-collapse sidebar di mobile
- Notification badge dengan counter
- User profile dropdown
- Logout functionality
- Role-based menu items

**Location:** `resources/js/layouts/AdminLayout.tsx`

---

### **2. Pages**

#### **Admin/Dashboard.tsx**

Dashboard admin dengan statistik dan aktivitas:

- ✅ Stats cards (Total Pegawai, Kehadiran, Cuti, Payroll)
- ✅ Recent activities timeline
- ✅ Quick actions panel
- ✅ Pending approvals section
- ✅ Progress indicators
- ✅ Trend indicators (up/down)

**Shadcn Components Used:**

- Card, CardContent, CardHeader, CardTitle, CardDescription
- Button, Badge, Progress
- Icons from lucide-react

**Location:** `resources/js/pages/Admin/Dashboard.tsx`

---

#### **Admin/Employees/Index.tsx**

Employee list page dengan fitur lengkap:

- ✅ Hero card dengan stats dan actions
- ✅ Advanced filter form (search, department, position, status)
- ✅ Data table dengan sorting dan pagination
- ✅ Bulk selection dan bulk delete
- ✅ Action dropdown per row (view, edit, delete)
- ✅ Delete confirmation dialog
- ✅ Avatar display
- ✅ Status badges (active, inactive, probation)

**Shadcn Components Used:**

- Table, TableBody, TableCell, TableHead, TableHeader, TableRow
- Card, Input, Select, Checkbox
- DropdownMenu, AlertDialog
- Avatar, Badge, Button

**Features:**

- Multi-select dengan checkbox
- Bulk delete functionality
- Server-side pagination
- Advanced filtering
- Export to Excel (button ready)
- Upload Excel (button ready)

**Location:** `resources/js/pages/Admin/Employees/Index.tsx`

---

## 🎯 Design System

### **Color Scheme**

Mengikuti design dari repository Arkana-dk/HRIS:

- Primary: Blue/indigo tones
- Success: Green
- Danger: Red
- Warning: Yellow
- Muted: Gray tones

### **Components Style**

- **Cards**: Rounded corners, subtle shadow
- **Buttons**: Pill-shaped untuk primary actions
- **Tables**: Zebra striping, hover effects
- **Badges**: Rounded, color-coded
- **Forms**: Clean, modern inputs

### **Typography**

- Headers: Bold, clear hierarchy
- Body: Readable, consistent spacing
- Metadata: Smaller, muted color

---

## 🚀 Usage Examples

### **Using AdminLayout**

```tsx
import AdminLayout from '@/layouts/AdminLayout';

export default function MyPage() {
    return (
        <AdminLayout title="My Page Title">
            {/* Your page content */}
        </AdminLayout>
    );
}
```

### **Using Table Components**

```tsx
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

<Table>
    <TableHeader>
        <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {data.map((item) => (
            <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>;
```

### **Using Cards**

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
    <CardHeader>
        <CardTitle>Title</CardTitle>
    </CardHeader>
    <CardContent>{/* Content */}</CardContent>
</Card>;
```

---

## 📋 Pages To Do

### **Priority 1 - Core Features**

- [ ] Employee Create/Edit Form
- [ ] Attendance Summary Page
- [ ] Attendance Clock In/Out Page
- [ ] Leave Request List & Form
- [ ] Payroll List & Processing

### **Priority 2 - Management**

- [ ] Department Management
- [ ] Position Management
- [ ] Leave Type Configuration
- [ ] Pay Component Management

### **Priority 3 - Reports**

- [ ] Attendance Reports
- [ ] Leave Reports
- [ ] Payroll Reports
- [ ] Export functionality

---

## 🔧 Backend Integration

### **Inertia.js Props**

Semua pages menggunakan Inertia.js untuk data dari Laravel:

```tsx
interface PageProps {
    auth: {
        user: User;
    };
    // ... other props
}

export default function Page({ auth, data }: PageProps) {
    // Use props directly
}
```

### **Route Navigation**

```tsx
import { Link, router } from '@inertiajs/react';

// Link component
<Link href="/admin/employees">Employees</Link>;

// Programmatic navigation
router.get('/admin/employees', { search: 'john' });
router.post('/admin/employees', formData);
router.delete(`/admin/employees/${id}`);
```

### **Forms**

```tsx
import { useForm } from '@inertiajs/react';

const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
});

const handleSubmit = (e) => {
    e.preventDefault();
    post('/admin/employees');
};
```

---

## 🎨 Customization

### **Adding New Menu Items**

Edit `AdminLayout.tsx`:

```tsx
const menuItems = [
    {
        label: 'New Section',
        icon: YourIcon,
        items: [{ label: 'Sub Item', href: '/admin/new-page' }],
    },
];
```

### **Custom Components**

Buat components reusable di `resources/js/components/`:

```tsx
// components/EmployeeCard.tsx
export function EmployeeCard({ employee }) {
    return <Card>{/* Your component */}</Card>;
}
```

---

## 📚 Resources

### **Shadcn UI Documentation**

- [Shadcn UI Docs](https://ui.shadcn.com)
- [Components](https://ui.shadcn.com/docs/components)
- [Themes](https://ui.shadcn.com/themes)

### **Inertia.js Documentation**

- [Inertia Docs](https://inertiajs.com)
- [React Adapter](https://inertiajs.com/client-side-setup#react)
- [Forms](https://inertiajs.com/forms)

### **React Documentation**

- [React Docs](https://react.dev)
- [TypeScript + React](https://react.dev/learn/typescript)

---

## 🎊 Next Steps

1. **Complete Employee CRUD**
    - Create form
    - Edit form
    - Detail view
    - Import Excel functionality

2. **Build Attendance Module**
    - Clock in/out interface
    - Attendance summary with calendar
    - Request management
    - Location settings

3. **Implement Leave Management**
    - Request form with validation
    - Approval workflow
    - Leave balance display
    - Calendar integration

4. **Payroll System**
    - Payrun wizard
    - Component configuration
    - Payslip generation
    - Reports

5. **Reports & Analytics**
    - Charts with recharts
    - Excel export
    - PDF generation
    - Filters and date ranges

---

**Design Reference:** [Arkana-dk/HRIS](https://github.com/Arkana-dk/HRIS)  
**UI Library:** Shadcn UI (49 components installed)  
**Framework:** React + TypeScript + Inertia.js  
**Backend:** Laravel 12

**Status:** 🚧 In Progress - Core pages completed, ready for expansion!
