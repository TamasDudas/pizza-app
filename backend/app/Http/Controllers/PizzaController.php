<?php

namespace App\Http\Controllers;

use App\Models\Pizza;
use Illuminate\Http\Request;
use App\Http\Resources\PizzaResource;

class PizzaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //Beállítunk egy alap pagination-t, ha nincs érték a 'per_page'-nél
        $pagination = $request->query('per_page', 6);

        //Ha nincs search, akkor legyen üres string
        $search = $request->query('search', '');

        //Amik lehetnek a rendezés alapján
        $allowedSorts = ['price_small', 'popularity', 'name'];

        //Rendezési mező (alapértelmezett: name)
        $sortBy = $request->query('sort_by', 'name');

        //Rendezési irány (alapértelmezett: asc = növekvő)
        $direction = $request->query('direction', 'asc');


        if (!in_array($sortBy, $allowedSorts)) {
            //Ha nem szerepel a tömbben a megadott érték, akkor legyen a name
            $sortBy = 'name';
        }
        //Validálás: csak asc (növekvő) vagy desc (csökkenő) lehet
        if (!in_array($direction, ['asc', 'desc'])) {
            $direction = 'asc';
        }

        //Létrehozunk egy query builder-t a Pizza modellre
        $query = Pizza::query();

        // 3 Karakter a szűrési limit
        if (!empty($search) && strlen($search) >= 3) {
            //A keresési feltételeket zárójelbe tesszük az SQL-ben.Closure-t használunk
            $query->where(function ($q) use ($search) {
                //A lekérdezés feltétele
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%")
                  ->orWhere('toppings', 'LIKE', "%{$search}%");
            });
        }

        //Rendezzük és lapozzuk az eredményeket
        $pizzas = $query->orderBy($sortBy, $direction)->paginate($pagination);

        return [
            //Az aktuális oldal pizzáinak adatai (átalakítva JSON-nak)
            'data' => PizzaResource::collection($pizzas->items()),

            //Hányadik oldalon vagyunk (pl. 2)
            'current_page' => $pizzas->currentPage(),

            // Utolsó oldal száma
            'last_page' => $pizzas->lastPage(),

            //Elemek száma oldalanként (pl. 6)
            'per_page' => $pizzas->perPage(),

            //Összes találat száma (szűrés/keresés után)
            'total' => $pizzas->total(),

            // Első elem sorszáma  (összes közül)
            'from' => $pizzas->firstItem(),

            // Utolsó elem sorszáma (összes közül)
            'to' => $pizzas->lastItem(),
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pizza $pizza)
    {
        return new PizzaResource($pizza);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
