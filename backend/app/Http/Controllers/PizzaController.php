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
        $pagination = $request->query('per_page', 6);
        $search = $request->query('search', '');

        $allowedSorts = ['price_small', 'popularity', 'name'];

        $sortBy = $request->query('sort_by', 'name');
        $direction = $request->query('direction', 'asc');


        if (!in_array($sortBy, $allowedSorts)) {
            $sortBy = 'name';
        }

        if (!in_array($direction, ['asc', 'desc'])) {
            $direction = 'asc';
        }

        $query = Pizza::query();

        // 3 Karakter a szűrési limit
        if (!empty($search) && strlen($search) >= 3) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%")
                  ->orWhere('toppings', 'LIKE', "%{$search}%");
            });
        }

        $pizzas = $query->orderBy($sortBy, $direction)->paginate($pagination);

        return [
            'data' => PizzaResource::collection($pizzas->items()),
            'current_page' => $pizzas->currentPage(),
            'last_page' => $pizzas->lastPage(),
            'per_page' => $pizzas->perPage(),
            'total' => $pizzas->total(),
            'from' => $pizzas->firstItem(),
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
