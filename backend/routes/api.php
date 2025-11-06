<?php

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PizzaController;
use App\Http\Controllers\ContactController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/pizzas', [PizzaController::class, 'index']);
Route::get('/pizzas/{pizza}', [PizzaController::class, 'show']);

Route::post('/orders', [OrderController::class, 'store']);
Route::post('/contact', [ContactController::class, 'store']);
