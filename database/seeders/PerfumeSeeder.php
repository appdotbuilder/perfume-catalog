<?php

namespace Database\Seeders;

use App\Models\Perfume;
use Illuminate\Database\Seeder;

class PerfumeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample perfumes
        $perfumes = [
            [
                'name' => 'Chanel No. 5',
                'brand' => 'Chanel',
                'description' => 'The quintessence of femininity, a timeless fragrance with floral aldehyde composition. This legendary perfume features notes of ylang-ylang, rose, and jasmine, creating an iconic scent that has captivated women for generations.',
                'price' => 150.00,
                'category' => 'Floral',
                'sub_category' => 'Rose',
            ],
            [
                'name' => 'Tom Ford Black Orchid',
                'brand' => 'Tom Ford',
                'description' => 'A luxurious and sensual fragrance that captures the rich, dark, and dramatic essence of the black orchid flower. With notes of black truffle, bergamot, and dark chocolate, this perfume is both mysterious and alluring.',
                'price' => 180.00,
                'category' => 'Oriental',
                'sub_category' => 'Exotic',
            ],
            [
                'name' => 'Dior Sauvage',
                'brand' => 'Dior',
                'description' => 'A radically fresh composition, dictated by a name that has the ring of a manifesto. Sauvage gets an invigorating rush from the vibrant freshness of Calabrian bergamot and the juicy sweetness of Sichuan pepper.',
                'price' => 120.00,
                'category' => 'Fresh',
                'sub_category' => 'Citrus',
            ],
            [
                'name' => 'Yves Saint Laurent Black Opium',
                'brand' => 'Yves Saint Laurent',
                'description' => 'The female addiction. A seductive scent of adrenaline and caffeine overdose. Black coffee accord, white flowers, and vanilla create an intoxicating blend that is both energizing and addictive.',
                'price' => 140.00,
                'category' => 'Gourmand',
                'sub_category' => 'Coffee',
            ],
            [
                'name' => 'Creed Aventus',
                'brand' => 'Creed',
                'description' => 'A sophisticated and contemporary scent, perfect for the modern gentleman. With top notes of pineapple, blackcurrant, apple, and bergamot, this fragrance exudes strength, power, and success.',
                'price' => 350.00,
                'category' => 'Fresh',
                'sub_category' => 'Fruity',
            ],
            [
                'name' => 'Jo Malone English Pear & Freesia',
                'brand' => 'Jo Malone',
                'description' => 'The essence of autumn. Ripe, golden pears are enhanced by a bouquet of white freesias, heightened with hints of patchouli. Fresh and feminine, this scent captures the beauty of an English garden.',
                'price' => 100.00,
                'category' => 'Fresh',
                'sub_category' => 'Fruity',
            ],
            [
                'name' => 'Hermès Terre d\'Hermès',
                'brand' => 'Hermès',
                'description' => 'A novel that expresses the alchemical power of the elements. Earth, but not earthy. Woody and mineral, the fragrance is built around the idea of earth and its elements.',
                'price' => 160.00,
                'category' => 'Woody',
                'sub_category' => 'Cedar',
            ],
            [
                'name' => 'Gucci Bloom',
                'brand' => 'Gucci',
                'description' => 'A rich white floral fragrance for women. The scent is created to unfold like its name, capturing the spirit of the contemporary, diverse, and authentic women who wear it.',
                'price' => 110.00,
                'category' => 'Floral',
                'sub_category' => 'Jasmine',
            ],
        ];

        foreach ($perfumes as $perfume) {
            Perfume::create($perfume);
        }

        // Create additional random perfumes
        Perfume::factory(20)->create();
    }
}