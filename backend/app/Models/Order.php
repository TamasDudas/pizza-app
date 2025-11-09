<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_name',
        'customer_email',
        'customer_phone',
        'delivery_address',
        'items',
        'total_price',
        'status',
        'aszf_accepted'
    ];

    protected $casts = [
        'items' => 'array'
    ];
}
