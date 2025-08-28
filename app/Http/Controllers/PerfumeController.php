<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePerfumeRequest;
use App\Http\Requests\UpdatePerfumeRequest;
use App\Models\Perfume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PerfumeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Perfume::query();

        // Apply search filter
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Apply category filter
        if ($request->filled('category')) {
            $query->filterByCategory($request->category);
        }

        $perfumes = $query->latest()->paginate(12)->withQueryString();
        
        // Get all categories for filter dropdown
        $categories = Perfume::distinct()->pluck('category')->sort()->values();

        return Inertia::render('welcome', [
            'perfumes' => $perfumes,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = [
            'Fresh' => ['Citrus', 'Aquatic', 'Green', 'Fruity'],
            'Floral' => ['Rose', 'Jasmine', 'Lily', 'Peony', 'Violet'],
            'Oriental' => ['Amber', 'Vanilla', 'Spicy', 'Exotic'],
            'Woody' => ['Sandalwood', 'Cedar', 'Pine', 'Vetiver'],
            'Gourmand' => ['Sweet', 'Chocolate', 'Coffee', 'Caramel'],
        ];

        return Inertia::render('perfumes/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePerfumeRequest $request)
    {
        $validated = $request->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('perfumes', 'public');
            $validated['image_path'] = $imagePath;
        }

        $perfume = Perfume::create($validated);

        return redirect()->route('perfumes.show', $perfume)
            ->with('success', 'Perfume added successfully to the catalog.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Perfume $perfume)
    {
        return Inertia::render('perfumes/show', [
            'perfume' => $perfume,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Perfume $perfume)
    {
        $categories = [
            'Fresh' => ['Citrus', 'Aquatic', 'Green', 'Fruity'],
            'Floral' => ['Rose', 'Jasmine', 'Lily', 'Peony', 'Violet'],
            'Oriental' => ['Amber', 'Vanilla', 'Spicy', 'Exotic'],
            'Woody' => ['Sandalwood', 'Cedar', 'Pine', 'Vetiver'],
            'Gourmand' => ['Sweet', 'Chocolate', 'Coffee', 'Caramel'],
        ];

        return Inertia::render('perfumes/edit', [
            'perfume' => $perfume,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePerfumeRequest $request, Perfume $perfume)
    {
        $validated = $request->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($perfume->image_path && Storage::disk('public')->exists($perfume->image_path)) {
                Storage::disk('public')->delete($perfume->image_path);
            }
            
            $imagePath = $request->file('image')->store('perfumes', 'public');
            $validated['image_path'] = $imagePath;
        }

        // Remove image from validated data if no new image was uploaded
        if (!$request->hasFile('image')) {
            unset($validated['image']);
        }

        $perfume->update($validated);

        return redirect()->route('perfumes.show', $perfume)
            ->with('success', 'Perfume updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Perfume $perfume)
    {
        // Delete image if exists
        if ($perfume->image_path && Storage::disk('public')->exists($perfume->image_path)) {
            Storage::disk('public')->delete($perfume->image_path);
        }

        $perfume->delete();

        return redirect()->route('perfumes.index')
            ->with('success', 'Perfume removed from catalog.');
    }
}