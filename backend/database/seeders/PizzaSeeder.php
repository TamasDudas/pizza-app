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
            ['Margherita', 'paradicsomszósz, mozzarella, bazsalikom', 'A klasszikus olasz pizza egyszerű és finom alapanyagokkal'],
            ['Hawaii', 'sonka, ananász, sajt', 'Trópusi ízek találkozása a hagyományos pizzával'],
            ['Pepperoni', 'pepperoni, sajt, paradicsomszósz', 'Pikáns pepperoni szalámival a fűszeres élményért'],
            ['Quattro Formaggi', 'mozzarella, gorgonzola, parmezán, camembert', 'Négyfajta sajt harmóniája a sajtszeretőknek'],
            ['Vegetariana', 'paradicsomszósz, paprika, gomba, cukkini, sajt', 'Friss zöldségek gazdag keveréke húsmentes élvezet'],
            ['Diavola', 'csípős szalámi, paprika, mozzarella', 'Tüzes pizza a csípős ízek kedvelőinek'],
            ['Capricciosa', 'sonka, gomba, articsóka, oliva, sajt', 'Gazdag feltétekkel megrakott hagyományos olasz pizza'],
            ['Tonno', 'tonhal, hagyma, sajt', 'Tengeri ízek egyszerű és egészséges összeállításban'],
            ['Salami', 'szalámi, paradicsomszósz, sajt', 'Klasszikus szalámi pizza mindig jó választás'],
            ['Funghi', 'gomba, paradicsomszósz, sajt', 'Zamatos gombák egyszerű és ízletes kombinációja'],
            ['Prosciutto', 'sonka, paradicsomszósz, mozzarella', 'Prémium sonka friss mozzarellával'],
            ['Calzone', 'sonka, gomba, sajt, paradicsomszósz', 'Összehajtott pizza gazdag töltelékkel'],
            ['Napoli', 'szardella, olíva, kapribogyó, sajt', 'Mediterrán ízek hagyományos nápolyi stílusban'],
            ['Boscaiola', 'gomba, szalámi, tejszín, sajt', 'Erdei gombák tejszínes szósszal'],
            ['Frutti di Mare', 'tengeri herkentyűk, fokhagyma, petrezselyem, sajt', 'Friss tengeri ételek ínyenceknek'],
            ['Mexicana', 'csípős hús, paprika, kukorica, sajt', 'Mexikói fűszerezés tüzes karakterrel']
        ];

        Pizza::truncate();

        $pizzaImages = [
            'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=400&h=300&fit=crop', // Margherita
            'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?w=400&h=300&fit=crop', // Hawaii
            'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?w=400&h=300&fit=crop', // Pepperoni
            'https://images.pexels.com/photos/4394612/pexels-photo-4394612.jpeg?w=400&h=300&fit=crop', // Quattro Formaggi
            'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?w=400&h=300&fit=crop', // Vegetariana
            'https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?w=400&h=300&fit=crop', // Diavola
            'https://images.pexels.com/photos/263041/pexels-photo-263041.jpeg?w=400&h=300&fit=crop', // Capricciosa
            'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?w=400&h=300&fit=crop', // Tonno
            'https://images.pexels.com/photos/265393/pexels-photo-265393.jpeg?w=400&h=300&fit=crop', // Salami
            'https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?w=400&h=300&fit=crop', // Funghi
            'https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?w=400&h=300&fit=crop', // Prosciutto
            'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?w=400&h=300&fit=crop', // Calzone
            'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?w=400&h=300&fit=crop', // Napoli
            'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?w=400&h=300&fit=crop', // Boscaiola
            'https://images.pexels.com/photos/4394613/pexels-photo-4394613.jpeg?w=400&h=300&fit=crop', // Frutti di Mare
            'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?w=400&h=300&fit=crop'  // Mexicana
        ];

        foreach ($pizzas as $index => $p) {
            Pizza::create([
                'name' => $p[0],
                'toppings' => $p[1],
                'description' => $p[2],
                'image' => $pizzaImages[$index],
                'price_small' => rand(1000, 1500),
                'price_medium' => rand(1600, 2200),
                'price_large' => rand(2300, 3000),
                'popularity' => rand(1, 50),
            ]);
        }
    }
}
