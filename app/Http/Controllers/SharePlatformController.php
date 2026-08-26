<?php
namespace App\Http\Controllers;

use App\Models\SharePlatform;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SharePlatformController extends Controller
{
    public function index()
    {
        return Inertia::render('Platforms/Index', [
            'platforms' => SharePlatform::orderBy('order_column')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string|unique:share_platforms,key',
            'label' => 'required|string',
            'color' => ['required', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'icon' => 'nullable|string',
            'url_template' => 'required|string',
            'is_active' => 'boolean',
            'order_column' => 'integer'
        ]);
        
        SharePlatform::create($validated);
        return back()->with('message', 'Platform created successfully.');
    }

    public function update(Request $request, SharePlatform $platform)
    {
        $validated = $request->validate([
            'key' => 'required|string|unique:share_platforms,key,'.$platform->id,
            'label' => 'required|string',
            'color' => ['required', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'icon' => 'nullable|string',
            'url_template' => 'required|string',
            'is_active' => 'boolean',
            'order_column' => 'integer'
        ]);

        $platform->update($validated);
        return back()->with('message', 'Platform updated successfully.');
    }

    public function destroy(SharePlatform $platform)
    {
        // Delete all associated click data from share_clicks
        \App\Models\ShareClick::where('platform', $platform->key)->delete();

        // Then delete the platform configuration
        $platform->delete();
        return back()->with('message', 'Platform and its click data deleted successfully.');
    }
}
