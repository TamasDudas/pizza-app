<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pizzas', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('toppings');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('price_small')->nullable();
            $table->unsignedInteger('price_medium')->nullable();
            $table->unsignedInteger('price_large')->nullable();
            $table->unsignedInteger('popularity')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pizzas');
    }
};
