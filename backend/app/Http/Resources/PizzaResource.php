<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PizzaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'name' => $this->name,
        'toppings' => $this->toppings,
        'description' => $this->description,
        'image' => $this->image,
        'price_small' => number_format($this->price_small, 0, '', ''). ' Ft',
        'price_medium' => number_format($this->price_medium, 0, '', ''). ' Ft',
        'price_large' => number_format($this->price_large, 0, '', ''). ' Ft',
        'popularity' => $this->popularity,
        ];
    }
}
