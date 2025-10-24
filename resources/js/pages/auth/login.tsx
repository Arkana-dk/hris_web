import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';

interface UserInfo {
    id: number;
    name: string;
    email: string;
}

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
    canRegister?: boolean;
    roles?: string[];
    users?: UserInfo[];
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
    roles = [],
}: LoginProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
        role: '',
    });

    const loginError = (
        errors as unknown as Record<string, string | undefined>
    )['loginError'];

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/login');
    }

    return (
        <div className="bg-muted/40 flex min-h-screen items-center justify-center p-4">
            <Head title="Login" />

            <div className="bg-card w-full max-w-md space-y-6 rounded-lg border p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your email and password to login
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {roles && roles.length > 0 && (
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <select
                                id="role"
                                value={data.role}
                                onChange={(e) =>
                                    setData('role', e.target.value)
                                }
                                className="block w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none"
                            >
                                <option value="">
                                    -- Select role (optional) --
                                </option>
                                {roles.map((r: string) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* quick-select users removed for privacy */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoFocus
                            autoComplete="email"
                            placeholder="email@example.com"
                        />
                        {errors.email && (
                            <p className="text-destructive text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            required
                            autoComplete="current-password"
                            placeholder="Password"
                        />
                        {errors.password && (
                            <p className="text-destructive text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {loginError && (
                        <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
                            {loginError}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        {processing ? 'Loading...' : 'Login'}
                    </Button>
                </form>

                <div className="text-muted-foreground mt-4 text-center text-sm">
                    <p>Default Accounts:</p>
                    <p className="mt-1">
                        Super Admin: superadmin@gmail.com / poweradmin
                    </p>
                    <p>Admin: admin@gmail.com / admin123</p>
                    <p>Employee: employee@gmail.com / employee123</p>
                </div>

                <div className="mt-4 flex justify-between text-sm">
                    {canResetPassword && (
                        <a
                            href="/forgot-password"
                            className="text-primary underline"
                        >
                            Forgot your password?
                        </a>
                    )}

                    {canRegister && (
                        <a href="/register" className="text-primary underline">
                            Create an account
                        </a>
                    )}
                </div>

                {status && (
                    <div className="text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}
