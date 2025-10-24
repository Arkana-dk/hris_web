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
        return Inertia::render('auth/login', [
            'canResetPassword' => false,
            'canRegister' => false,
        ]);
    }

    // Proses login
    public function login(Request $request)
    {
      $credentials =  $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();

            // Redirect based on Spatie roles
            if ($user->hasRole('super-admin')) {
                return redirect()->route('admin.dashboard'); // Super admin ke admin dashboard
            }
            if ($user->hasRole(['payroll-admin', 'hr-admin', 'system-admin'])) {
                return redirect()->route('admin.dashboard');
            }
            if ($user->hasRole('payroll-staff')) {
                return redirect()->route('admin.dashboard'); // Staff juga ke admin dashboard
            }
            if ($user->hasRole('hr-staff')) {
                return redirect()->route('admin.dashboard');
            }
            if ($user->hasRole('employee')) {
                return redirect()->route('employee.dashboard');
            }
            
            // Default redirect untuk user tanpa role
            return redirect()->route('employee.dashboard');
        }

            return redirect()->back()->withErrors(['loginError' => 'Email atau password salah']);
            
        }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
    
}
