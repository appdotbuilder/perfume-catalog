<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Perfume
 *
 * @property int $id
 * @property string $name
 * @property string $brand
 * @property string $description
 * @property float $price
 * @property string $category
 * @property string|null $sub_category
 * @property string|null $image_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume query()
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume whereBrand($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume whereSubCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume whereUpdatedAt($value)
 * @method static \Database\Factories\PerfumeFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume search($term)
 * @method static \Illuminate\Database\Eloquent\Builder|Perfume filterByCategory($category)
 * 
 * @mixin \Eloquent
 */
class Perfume extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'brand',
        'description',
        'price',
        'category',
        'sub_category',
        'image_path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to search for perfumes by name, brand, or description.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $term
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $term)
    {
        if (empty($term)) {
            return $query;
        }

        // Use LIKE search for all databases for simplicity and compatibility
        return $query->where(function ($q) use ($term) {
            $q->where('name', 'LIKE', "%{$term}%")
              ->orWhere('brand', 'LIKE', "%{$term}%")
              ->orWhere('description', 'LIKE', "%{$term}%");
        });
    }

    /**
     * Scope a query to filter perfumes by category.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $category
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilterByCategory($query, $category)
    {
        if (empty($category)) {
            return $query;
        }

        return $query->where('category', $category);
    }

    /**
     * Get the formatted price attribute.
     *
     * @return string
     */
    public function getFormattedPriceAttribute()
    {
        return '$' . number_format($this->price, 2);
    }

    /**
     * Get the display category attribute.
     *
     * @return string
     */
    public function getDisplayCategoryAttribute()
    {
        if ($this->sub_category) {
            return $this->category . ' - ' . $this->sub_category;
        }
        return $this->category;
    }
}