<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{Position, Department, Section, Employee};
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Inertia\Inertia;

class SectionController extends Controller
{
    public function index(Request $request)
    {   
        $search = $request->get('search', $request->get('q'));
        $deptId = $request->integer('department_id');
        
        $sections = Section::with('department')
            ->withCount('employees')
            ->when($search, fn($qr) => $qr->where('name','like',"%{$search}%"))
            ->when($deptId, fn($qr) => $qr->where('department_id', $deptId))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();
            
        $departments = Department::all();

        return Inertia::render('Admin/Sections/Index', [
            'sections' => $sections,
            'departments' => $departments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'code'          => 'required|string|max:50',
            'description'   => 'nullable|string',
            'department_id' => 'required|exists:departments,id',
        ]);

        $exists = Section::where('name', $validated['name'])
            ->where('department_id', $validated['department_id'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['error' => 'Seksi dengan nama tersebut sudah ada di departemen yang sama.']);
        }

        Section::create($validated);

        return back()->with('success', 'Seksi berhasil ditambahkan.');
    }

    public function update(Request $request, Section $section)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'code'          => 'required|string|max:50',
            'description'   => 'nullable|string',
            'department_id' => 'required|exists:departments,id',
        ]);

        $exists = Section::where('name', $validated['name'])
            ->where('department_id', $validated['department_id'])
            ->where('id', '!=', $section->id)
            ->exists();

        if ($exists) {
            return back()->withErrors(['error' => 'Seksi dengan nama tersebut sudah ada di departemen ini.']);
        }

        $section->update($validated);

        return back()->with('success', 'Perubahan berhasil disimpan.');
    }

    public function destroy(Section $section)
    {
        // Guard sisi server (penting meski UI dikunci)
        $related = [];

        if ($section->positions()->exists()) {
            $related[] = 'posisi';
        }
        // Jika ada relasi karyawan → cek juga
        if (class_exists(Employee::class) && Employee::where('section_id', $section->id)->exists()) {
            $related[] = 'karyawan';
        }

        if (!empty($related)) {
            return back()->with('error', 'Tidak dapat menghapus karena masih terkait: ' . implode(' & ', $related) . '. Lepaskan terlebih dahulu.');
        }

        try {
            // Pastikan pivot bersih jika constraint belum cascade
            $section->positions()->detach();

            $section->delete();
            return redirect()->route('admin.sections.index')->with('success', 'Seksi berhasil dihapus.');
        } catch (QueryException $e) {
            // fallback bila ada FK lain yang menahan
            return back()->with('error', 'Gagal menghapus (terkait data lain). Lepaskan relasi terlebih dahulu.');
        }
    }
    public function byDepartment(\Illuminate\Http\Request $request)
{
    $id = (int) $request->query('department_id', 0);

    if ($id <= 0) {
        // Tetap 200 supaya fetch tidak gagal; data kosong saja
        return response()->json(['data' => [], 'meta' => ['reason' => 'missing department_id']]);
    }

    $sections = \App\Models\Section::query()
        ->where('department_id', $id)
        ->orderBy('name')
        ->get(['id','name']);

    return response()->json([
        'data' => $sections,
        'meta' => ['count' => $sections->count()],
    ]);
}

}
