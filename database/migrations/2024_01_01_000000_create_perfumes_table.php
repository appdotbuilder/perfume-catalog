<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('perfumes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('brand');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->string('category');
            $table->string('sub_category')->nullable();
            $table->string('image_path')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('brand');
            $table->index('category');
            $table->index('price');
            $table->index(['category', 'sub_category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perfumes');
    }
};