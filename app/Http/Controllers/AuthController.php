<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    // Tampilkan form login
    public function showLoginForm()
    {
        return Inertia::render('auth/Login', [
            'canResetPassword' => false,
            'canRegister' => false,
        ]);
    }

    // Proses login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();

            // Determine redirect URL based on Spatie roles
            $redirectUrl = null;
            
            if ($user->hasRole('super-admin')) {
                $redirectUrl = route('admin.dashboard');
            } elseif ($user->hasRole(['payroll-admin', 'hr-admin', 'system-admin'])) {
                $redirectUrl = route('admin.dashboard');
            } elseif ($user->hasRole('payroll-staff')) {
                $redirectUrl = route('admin.dashboard');
            } elseif ($user->hasRole('hr-staff')) {
                $redirectUrl = route('admin.dashboard');
            } elseif ($user->hasRole('employee')) {
                $redirectUrl = route('employee.dashboard');
            } else {
                // Default redirect untuk user tanpa role
                $redirectUrl = route('employee.dashboard');
            }

            // For Inertia requests, use Inertia::location for a full page visit
            if ($request->wantsJson() || $request->header('X-Inertia')) {
                return Inertia::location($redirectUrl);
            }

            return redirect($redirectUrl);
        }

        return back()->withErrors([
            'loginError' => 'Email atau password salah'
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
    
}
