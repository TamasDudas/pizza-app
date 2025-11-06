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
        return PizzaResource::collection(Pizza::orderBy('name')->get());

        $allowedSorts = ['price_small', 'popularity', 'name'];

        $sortBy = $request->query('sort_by', 'name');
        $direction = $request->query('direction', 'asc');


        if (!in_array($sortBy, $allowedSorts)) {
            $sortBy = 'name';
        }

        if (!in_array($direction, ['asc', 'desc'])) {
            $direction = 'asc';
        }

        $pizzas = Pizza::orderBy($sortBy, $direction)->get();

        return PizzaResource::collection($pizzas);
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
