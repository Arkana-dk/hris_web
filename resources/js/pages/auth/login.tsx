import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
    canRegister?: boolean;
}

export default function Login({ status }: LoginProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const loginError = (
        errors as unknown as Record<string, string | undefined>
    )['loginError'];

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        post('/login', {
            preserveScroll: true,
            onSuccess: () => {
                window.location.reload();
            },
            onError: () => {
                setIsLoading(false);
            },
        });
    }

    return (
        <>
            <Head title="Login - HR Workspace" />

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
                <div className="absolute right-6 top-6 z-10 md:right-10 md:top-10">
                    <a
                        href="/about-us"
                        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-700/20 transition hover:bg-blue-500"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4M12 8h.01" />
                        </svg>
                        About Us
                    </a>
                </div>

                <div className="flex min-h-screen items-center justify-center p-6 md:p-10">
                    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 md:grid-cols-2">
                        <div className="relative hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 md:flex md:flex-col md:items-center md:justify-center md:p-12">
                            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                                <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />
                            </div>

                            <div className="relative z-10 text-center text-white">
                                <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                                        <rect x="3" y="3" width="18" height="18" rx="4" />
                                        <path d="M8 10h8M8 14h5" />
                                    </svg>
                                </div>

                                <div className="mb-8 flex justify-center">
                                    <img src="/images/man-running.png" alt="Team running" className="h-64 w-auto object-contain drop-shadow-2xl" />
                                </div>

                                <h2 className="mb-3 text-2xl font-bold leading-tight">PT Hakuna Matata</h2>
                                <p className="mb-2 text-lg font-semibold text-white/90">HRIS System</p>
                                <p className="text-sm text-white/70">Workforce Management • Enterprise Solution</p>
                            </div>
                        </div>

                        <div className="relative bg-white">
                            <div className="p-8 sm:p-10 md:p-12">
                                <div className="mb-6 flex justify-center md:hidden">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                            <rect x="3" y="3" width="18" height="18" rx="4" />
                                            <path d="M8 10h8M8 14h5" />
                                        </svg>
                                    </div>
                                </div>

                                <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-[34px]">Selamat Datang</h1>
                                <p className="mt-2 text-slate-500">Masuk ke HRIS untuk melanjutkan</p>

                                {loginError && (
                                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        <div className="flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 8v4M12 16h.01" />
                                            </svg>
                                            {loginError}
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M4 8l8 5 8-5" />
                                                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                                                </svg>
                                            </span>
                                            <input
                                                id="email"
                                                type="text"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="nama@example.com"
                                                autoFocus
                                                required
                                                className="w-full rounded-xl border border-slate-300 bg-white px-12 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            />
                                        </div>
                                        {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="3" y="11" width="18" height="9" rx="2" />
                                                    <path d="M7 11V8a5 5 0 0 1 10 0v3" />
                                                </svg>
                                            </span>
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="••••••••"
                                                required
                                                className="w-full rounded-xl border border-slate-300 bg-white px-12 py-3 pr-12 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label="Toggle password visibility"
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                                            >
                                                {showPassword ? (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                ) : (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.477 0-8.268-2.943-9.542-7a10.506 10.506 0 0 1 4.23-5.568M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                                        <path d="M3 3l18 18" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && <p className="mt-2 text-xs text-red-600">{errors.password}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading || processing}
                                        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-xl hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
                                        <span className="relative">
                                            {isLoading || processing ? 'Memproses...' : 'Masuk ke HRIS'}
                                        </span>
                                    </button>

                                    <div className="flex items-center justify-center gap-2 pt-2 text-sm text-slate-500">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="9" rx="2" />
                                            <path d="M7 11V8a5 5 0 0 1 10 0v3" />
                                        </svg>
                                        <span>Data Anda terenkripsi dan aman</span>
                                    </div>
                                </form>

                                <p className="mt-8 text-center text-xs text-slate-400">© {new Date().getFullYear()} HRIS • PT Hakuna Matata</p>
                            </div>
                        </div>
                    </div>

                    {status && (
                        <div className="fixed right-4 top-4 z-50 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 shadow-lg ring-1 ring-green-200">
                            <div className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                {status}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
