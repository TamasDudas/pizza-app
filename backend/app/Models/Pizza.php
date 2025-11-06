<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'toppings',
        'description',
        'image',
        'price_small',
        'price_medium',
        'price_large',
        'popularity'

    ];
}
