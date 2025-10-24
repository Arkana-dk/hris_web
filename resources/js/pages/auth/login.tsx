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
                // Force full page reload after successful login to ensure proper navigation
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

            <style>{`
                :root {
                    --brand-500: #3B82F6;
                    --brand-600: #2563EB;
                    --ink: #0F172A;
                    --muted: #6B7280;
                    --bg: #F8FAFC;
                }
                body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
                .glass { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
            `}</style>
            <div className="relative min-h-screen overflow-hidden bg-[#F4F7FB] p-6 md:p-10">
                {/* Outer container */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-30px_rgba(2,6,23,0.25)] ring-1 ring-black/5 md:grid-cols-2">
                    {/* Left brand panel */}
                    <div className="relative hidden bg-gradient-to-br from-[#0E2730] via-[#114C49] to-[#071716] md:block">
                        <div className="absolute inset-6 rounded-3xl ring-1 ring-white/10" />
                        <div className="relative flex h-full flex-col justify-between p-10 text-white/90">
                            {/* top brand */}
                            <div className="flex items-center gap-4">
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        className="text-white/90"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="18"
                                            height="18"
                                            rx="4"
                                        />
                                        <path d="M8 10h8M8 14h5" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[11px] tracking-wider text-white/70">
                                        PT HAKUNA MATATA
                                    </div>
                                    <div className="text-xl font-semibold tracking-tight text-white">
                                        HRIS
                                    </div>
                                </div>
                            </div>

                            {/* center subtle glare */}
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.06),transparent_60%)]" />

                            {/* bottom signature */}
                            <div className="mt-auto">
                                <div className="text-sm font-semibold">
                                    Tim HRIS
                                </div>
                                <div className="text-sm text-white/70">
                                    Workforce • Enterprise
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right form side */}
                    <div className="relative">
                        <div className="p-8 sm:p-10 md:p-12">
                            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-[34px]">
                                Selamat Datang
                            </h1>
                            <p className="mt-2 text-slate-500">
                                Masuk ke HRIS untuk melanjutkan
                            </p>

                            {/* Error banner */}
                            {loginError && (
                                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {loginError}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 space-y-5"
                            >
                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                            >
                                                <path d="M4 8l8 5 8-5" />
                                                <rect
                                                    x="3"
                                                    y="5"
                                                    width="18"
                                                    height="14"
                                                    rx="2"
                                                    ry="2"
                                                />
                                            </svg>
                                        </span>
                                        <input
                                            id="email"
                                            type="text"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            placeholder="Masukkan email"
                                            autoFocus
                                            required
                                            className="w-full rounded-xl border border-slate-300 bg-white px-10 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                            >
                                                <rect
                                                    x="3"
                                                    y="11"
                                                    width="18"
                                                    height="9"
                                                    rx="2"
                                                />
                                                <path d="M7 11V8a5 5 0 0 1 10 0v3" />
                                            </svg>
                                        </span>
                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="••••••••"
                                            required
                                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-10 py-3 pr-12 text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            aria-label="Tampilkan password"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                        >
                                            {showPassword ? (
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="3"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.477 0-8.268-2.943-9.542-7a10.506 10.506 0 0 1 4.23-5.568M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                                    <path d="M3 3l18 18" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* CTA */}
                                <button
                                    type="submit"
                                    disabled={isLoading || processing}
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white shadow-sm ring-1 ring-emerald-700/20 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isLoading || processing
                                        ? 'Memproses…'
                                        : 'Masuk ke HRIS'}
                                </button>

                                {/* Secure note */}
                                <div className="flex items-center justify-center gap-2 pt-1 text-sm text-slate-500">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <rect
                                            x="3"
                                            y="11"
                                            width="18"
                                            height="9"
                                            rx="2"
                                        />
                                        <path d="M7 11V8a5 5 0 0 1 10 0v3" />
                                    </svg>
                                    <span>Data Anda terenkripsi dan aman</span>
                                </div>
                            </form>

                            {/* Copyright */}
                            <p className="mt-8 text-center text-xs text-slate-400">
                                © {new Date().getFullYear()} HRIS • PT Hakuna
                                Matata
                            </p>
                        </div>
                    </div>
                </div>

                {/* status toast */}
                {status && (
                    <div className="fixed right-4 top-4 rounded-md bg-green-50 px-4 py-2 text-green-600 shadow">
                        {status}
                    </div>
                )}
            </div>
        </>
    );
}
