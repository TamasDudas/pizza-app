<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'required|string|max:30',
            'delivery_address' => 'required|string',
            'items' => 'required|array',
            'total_price' => 'required|integer|min:0'
        ]);


        $order = Order::create($validated);

        return response()->json([
            'message' => 'Sikeres rendelés',
            'order' => $order,
        ], 201);
    }
}
