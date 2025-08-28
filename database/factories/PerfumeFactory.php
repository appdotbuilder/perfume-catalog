<?php

namespace Database\Factories;

use App\Models\Perfume;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Perfume>
 */
class PerfumeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Perfume>
     */
    protected $model = Perfume::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = [
            'Chanel', 'Dior', 'Tom Ford', 'Yves Saint Laurent', 'Giorgio Armani',
            'Versace', 'Prada', 'Gucci', 'Hermès', 'Creed', 'Jo Malone',
            'Marc Jacobs', 'Calvin Klein', 'Dolce & Gabbana', 'Burberry'
        ];

        $categories = [
            'Fresh' => ['Citrus', 'Aquatic', 'Green', 'Fruity'],
            'Floral' => ['Rose', 'Jasmine', 'Lily', 'Peony', 'Violet'],
            'Oriental' => ['Amber', 'Vanilla', 'Spicy', 'Exotic'],
            'Woody' => ['Sandalwood', 'Cedar', 'Pine', 'Vetiver'],
            'Gourmand' => ['Sweet', 'Chocolate', 'Coffee', 'Caramel'],
        ];

        $category = $this->faker->randomElement(array_keys($categories));
        $subCategory = $this->faker->randomElement($categories[$category]);

        $perfumeNames = [
            'Eau de Parfum', 'Eau de Toilette', 'Cologne', 'Elixir', 'Essence',
            'Secret', 'Mystery', 'Dreams', 'Noir', 'Blanche', 'Rouge',
            'Gold', 'Platinum', 'Crystal', 'Diamond', 'Royal', 'Imperial'
        ];

        return [
            'name' => $this->faker->randomElement($perfumeNames) . ' ' . $this->faker->word(),
            'brand' => $this->faker->randomElement($brands),
            'description' => $this->faker->paragraph(random_int(3, 6)),
            'price' => $this->faker->randomFloat(2, 25.00, 500.00),
            'category' => $category,
            'sub_category' => $subCategory,
            'image_path' => null,
        ];
    }
}