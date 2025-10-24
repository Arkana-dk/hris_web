<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Tampilkan daftar department dengan total pegawai.
     */
    public function index(Request $request)
    {
        $search = $request->get('search', $request->get('q'));

        $departments = Department::withCount('employees')
            ->when($search, fn($qr) => $qr->where('name', 'like', "%{$search}%"))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Departments/Index', [
            'departments' => $departments,
        ]);
    }

    /**
     * Tampilkan form edit department.
     */
    public function edit(Department $department)
    {
        return view('admin.pages.department.edit', compact('department'));
    }

    /**
     * Update nama department.
     */
    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name,' . $department->id,
            'code' => 'required|string|max:50|unique:departments,code,' . $department->id,
            'description' => 'nullable|string',
        ]);

        $department->update($validated);

        return back()->with('success', 'Departemen berhasil diperbarui.');
    }

    /**
     * Simpan department baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name',
            'code' => 'required|string|max:50|unique:departments,code',
            'description' => 'nullable|string',
        ]);

        Department::create($validated);

        return back()->with('success', 'Departemen berhasil ditambahkan.');
    }

    /**
     * Hapus sebuah department.
     */
    public function destroy(Department $department)
    {
        if ($department->employees()->exists()) {
            return back()->withErrors(['error' => 'Tidak bisa menghapus: masih ada pegawai di department ini.']);
        }

        $department->delete();
        return back()->with('success', 'Department berhasil dihapus.');
    }
}
