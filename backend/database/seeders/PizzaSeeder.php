<?php

namespace Database\Seeders;

use App\Models\Pizza;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PizzaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pizzas = [
            ['Margherita', 'paradicsomszósz, mozzarella, bazsalikom'],
            ['Hawaii', 'sonka, ananász, sajt'],
            ['Pepperoni', 'pepperoni, sajt, paradicsomszósz'],
            ['Quattro Formaggi', 'mozzarella, gorgonzola, parmezán, camembert'],
            ['Vegetariana', 'paradicsomszósz, paprika, gomba, cukkini, sajt'],
            ['Diavola', 'csípős szalámi, paprika, mozzarella'],
            ['Capricciosa', 'sonka, gomba, articsóka, oliva, sajt'],
            ['Tonno', 'tonhal, hagyma, sajt'],
            ['Salami', 'szalámi, paradicsomszósz, sajt'],
            ['Funghi', 'gomba, paradicsomszósz, sajt'],
            ['Prosciutto', 'sonka, paradicsomszósz, mozzarella'],
            ['Calzone', 'sonka, gomba, sajt, paradicsomszósz'],
            ['Napoli', 'szardella, olíva, kapribogyó, sajt'],
            ['Boscaiola', 'gomba, szalámi, tejszín, sajt'],
            ['Frutti di Mare', 'tengeri herkentyűk, fokhagyma, petrezselyem, sajt'],
            ['Mexicana', 'csípős hús, paprika, kukorica, sajt']
        ];

        Pizza::truncate();

        foreach ($pizzas as $index => $p) {
            Pizza::create([
                'name' => $p[0],
                'toppings' => $p[1],
                'description' => $p[0] . ' pizza leírása',
                'image' => 'https://loremflickr.com/400/300/pizza?random=' . ($index + 1),
                'price_small' => rand(1000, 1500),
                'price_medium' => rand(1600, 2200),
                'price_large' => rand(2300, 3000),
                'popularity' => rand(1, 50),
            ]);
        }
    }
}
