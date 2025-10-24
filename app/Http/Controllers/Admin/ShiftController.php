<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    public function index()
    {
        $shifts = Shift::orderBy('start_time')->get();
        return \Inertia\Inertia::render('Admin/Shifts/Index', [
            'shifts' => $shifts,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required|string|unique:shifts',
            'start_time' => 'required|date_format:H:i',
            'end_time'   => 'required|date_format:H:i',
        ]);
        Shift::create($request->only('name','start_time','end_time'));
        return back()->with('success','Shift ditambahkan');
    }

    public function update(Request $request, Shift $shift)
    {
        $request->validate([
            'name'       => 'required|string|unique:shifts,name,'.$shift->id,
            'start_time' => 'required|date_format:H:i',
            'end_time'   => 'required|date_format:H:i',
        ]);
        $shift->update($request->only('name','start_time','end_time'));
        return back()->with('success','Shift diperbarui');
    }

    public function destroy(Shift $shift)
    {
        $shift->delete();
        return back()->with('success','Shift dihapus');
    }
}
