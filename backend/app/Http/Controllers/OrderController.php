<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Mail\OrderConfirmationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
            'total_price' => 'required|integer|min:0',
            'aszf_accepted' => 'required|boolean|accepted'
        ]);


        $order = Order::create($validated);

        return response()->json([
            'message' => 'Sikeres rendelés',
            'order' => $order,
        ], 201);
    }
}
