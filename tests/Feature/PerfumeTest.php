<?php

namespace Tests\Feature;

use App\Models\Perfume;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PerfumeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_can_view_perfume_catalog()
    {
        Perfume::factory()->create([
            'name' => 'Test Perfume',
            'brand' => 'Test Brand',
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('perfumes.data', 1)
            ->where('perfumes.data.0.name', 'Test Perfume')
        );
    }

    public function test_can_search_perfumes()
    {
        Perfume::factory()->create([
            'name' => 'Chanel No. 5',
            'brand' => 'Chanel',
        ]);
        
        Perfume::factory()->create([
            'name' => 'Dior Sauvage',
            'brand' => 'Dior',
        ]);

        $response = $this->get('/?search=Chanel');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('perfumes.data', 1)
            ->where('perfumes.data.0.name', 'Chanel No. 5')
        );
    }

    public function test_can_filter_by_category()
    {
        Perfume::factory()->create([
            'name' => 'Fresh Perfume',
            'category' => 'Fresh',
        ]);
        
        Perfume::factory()->create([
            'name' => 'Floral Perfume',
            'category' => 'Floral',
        ]);

        $response = $this->get('/?category=Fresh');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('perfumes.data', 1)
            ->where('perfumes.data.0.category', 'Fresh')
        );
    }

    public function test_can_view_perfume_details()
    {
        $perfume = Perfume::factory()->create([
            'name' => 'Test Perfume',
            'brand' => 'Test Brand',
        ]);

        $response = $this->get("/perfumes/{$perfume->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('perfumes/show')
            ->where('perfume.name', 'Test Perfume')
        );
    }

    public function test_can_create_perfume()
    {
        $response = $this->get('/perfumes/create');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('perfumes/create')
            ->has('categories')
        );
    }

    public function test_can_store_perfume()
    {
        $file = UploadedFile::fake()->image('perfume.jpg');

        $response = $this->post('/perfumes', [
            'name' => 'New Perfume',
            'brand' => 'New Brand',
            'description' => 'A beautiful fragrance',
            'price' => 150.00,
            'category' => 'Fresh',
            'sub_category' => 'Citrus',
            'image' => $file,
        ]);

        $perfume = Perfume::first();
        $response->assertRedirect("/perfumes/{$perfume->id}");

        $this->assertDatabaseHas('perfumes', [
            'name' => 'New Perfume',
            'brand' => 'New Brand',
            'price' => 150.00,
        ]);

        Storage::disk('public')->assertExists("perfumes/{$file->hashName()}");
    }

    public function test_can_store_perfume_without_image()
    {
        $response = $this->post('/perfumes', [
            'name' => 'New Perfume',
            'brand' => 'New Brand',
            'description' => 'A beautiful fragrance',
            'price' => 150.00,
            'category' => 'Fresh',
            'sub_category' => 'Citrus',
        ]);

        $perfume = Perfume::first();
        $response->assertRedirect("/perfumes/{$perfume->id}");

        $this->assertDatabaseHas('perfumes', [
            'name' => 'New Perfume',
            'image_path' => null,
        ]);
    }

    public function test_can_edit_perfume()
    {
        $perfume = Perfume::factory()->create();

        $response = $this->get("/perfumes/{$perfume->id}/edit");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('perfumes/edit')
            ->where('perfume.id', $perfume->id)
        );
    }

    public function test_can_update_perfume()
    {
        $perfume = Perfume::factory()->create([
            'name' => 'Old Name',
            'price' => 100.00,
        ]);

        $response = $this->put("/perfumes/{$perfume->id}", [
            'name' => 'Updated Name',
            'brand' => $perfume->brand,
            'description' => $perfume->description,
            'price' => 200.00,
            'category' => $perfume->category,
            'sub_category' => $perfume->sub_category,
        ]);

        $response->assertRedirect("/perfumes/{$perfume->id}");

        $this->assertDatabaseHas('perfumes', [
            'id' => $perfume->id,
            'name' => 'Updated Name',
            'price' => 200.00,
        ]);
    }

    public function test_can_delete_perfume()
    {
        $perfume = Perfume::factory()->create();

        $response = $this->delete("/perfumes/{$perfume->id}");

        $response->assertRedirect('/');
        $this->assertDatabaseMissing('perfumes', ['id' => $perfume->id]);
    }

    public function test_validates_required_fields()
    {
        $response = $this->post('/perfumes', []);

        $response->assertSessionHasErrors([
            'name',
            'brand',
            'description',
            'price',
            'category',
        ]);
    }

    public function test_validates_price_is_numeric()
    {
        $response = $this->post('/perfumes', [
            'name' => 'Test Perfume',
            'brand' => 'Test Brand',
            'description' => 'Test description',
            'price' => 'not-a-number',
            'category' => 'Fresh',
        ]);

        $response->assertSessionHasErrors('price');
    }

    public function test_validates_image_type()
    {
        $file = UploadedFile::fake()->create('document.pdf', 1000);

        $response = $this->post('/perfumes', [
            'name' => 'Test Perfume',
            'brand' => 'Test Brand',
            'description' => 'Test description',
            'price' => 150.00,
            'category' => 'Fresh',
            'image' => $file,
        ]);

        $response->assertSessionHasErrors('image');
    }
}