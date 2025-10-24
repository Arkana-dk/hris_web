import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    Building2,
    Calendar,
    ChevronRight,
    Clock,
    DollarSign,
    FileText,
    LayoutDashboard,
    LogOut,
    Settings,
    User,
    Users,
} from 'lucide-react';
import { ReactNode } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { auth } = usePage().props as any;

    const menuItems = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: '/admin/dashboard',
        },
        {
            label: 'Manajemen Karyawan',
            icon: Users,
            items: [
                { label: 'Data Karyawan', href: '/admin/employees' },
                { label: 'Departemen', href: '/admin/departments' },
                { label: 'Seksi', href: '/admin/sections' },
                { label: 'Posisi', href: '/admin/positions' },
                { label: 'Grup', href: '/admin/groups' },
            ],
        },
        {
            label: 'Presensi',
            icon: Clock,
            items: [
                { label: 'Kehadiran', href: '/admin/attendance' },
                {
                    label: 'Ringkasan Presensi',
                    href: '/admin/attendance-summary',
                },
                {
                    label: 'Request Presensi',
                    href: '/admin/attendance-requests',
                },
                {
                    label: 'Pengaturan Lokasi',
                    href: '/admin/attendance-location-settings',
                },
            ],
        },
        {
            label: 'Cuti & Izin',
            icon: Calendar,
            items: [
                { label: 'Request Cuti', href: '/admin/leave-requests' },
                { label: 'Jenis Cuti', href: '/admin/leave-types' },
                { label: 'Kebijakan Cuti', href: '/admin/leave-policies' },
                { label: 'Hak Cuti', href: '/admin/leave-entitlements' },
                { label: 'Ledger Cuti', href: '/admin/leave-ledgers' },
            ],
        },
        {
            label: 'Lembur',
            icon: FileText,
            items: [
                { label: 'Request Lembur', href: '/admin/overtime-requests' },
            ],
        },
        {
            label: 'Penggajian',
            icon: DollarSign,
            items: [
                { label: 'Pay Runs', href: '/admin/payruns' },
                { label: 'Komponen Gaji', href: '/admin/pay-components' },
                { label: 'Rate Komponen', href: '/admin/pay-component-rates' },
                { label: 'Pay Groups', href: '/admin/pay-groups' },
            ],
        },
        {
            label: 'Pengaturan',
            icon: Settings,
            items: [
                {
                    label: 'Company Bank Account',
                    href: '/admin/company-bank-accounts',
                },
                { label: 'Kalender', href: '/admin/calendar' },
            ],
        },
    ];

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                {/* Sidebar */}
                <Sidebar>
                    <SidebarHeader className="border-b p-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                                <Building2 className="text-primary-foreground h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                    HRIS System
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    Admin Panel
                                </span>
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {menuItems.map((item) => (
                                        <SidebarMenuItem key={item.label}>
                                            {item.items ? (
                                                <>
                                                    <SidebarGroupLabel className="px-2 py-1.5">
                                                        <item.icon className="mr-2 h-4 w-4" />
                                                        {item.label}
                                                    </SidebarGroupLabel>
                                                    <SidebarMenu>
                                                        {item.items.map(
                                                            (subItem) => (
                                                                <SidebarMenuItem
                                                                    key={
                                                                        subItem.href
                                                                    }
                                                                >
                                                                    <SidebarMenuButton
                                                                        asChild
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                subItem.href
                                                                            }
                                                                            className="pl-8"
                                                                        >
                                                                            <ChevronRight className="mr-2 h-3 w-3" />
                                                                            {
                                                                                subItem.label
                                                                            }
                                                                        </Link>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                            ),
                                                        )}
                                                    </SidebarMenu>
                                                </>
                                            ) : (
                                                <SidebarMenuButton asChild>
                                                    <Link href={item.href}>
                                                        <item.icon className="mr-2 h-4 w-4" />
                                                        {item.label}
                                                    </Link>
                                                </SidebarMenuButton>
                                            )}
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter className="border-t p-4">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={auth?.user?.avatar} />
                                <AvatarFallback>
                                    {auth?.user?.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="text-sm font-medium">
                                    {auth?.user?.name}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    {auth?.user?.email}
                                </p>
                            </div>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header */}
                    <header className="bg-background sticky top-0 z-10 flex h-16 items-center gap-4 border-b px-6">
                        <SidebarTrigger />
                        <div className="flex-1">
                            {title && (
                                <h1 className="text-lg font-semibold">
                                    {title}
                                </h1>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative"
                            >
                                <Bell className="h-5 w-5" />
                                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                                    3
                                </Badge>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={auth?.user?.avatar}
                                            />
                                            <AvatarFallback>
                                                {auth?.user?.name
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="hidden md:inline">
                                            {auth?.user?.name}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin/profile">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin/settings">
                                            <Settings className="mr-2 h-4 w-4" />
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="p-6">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
}
