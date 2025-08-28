import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Sparkles, ShoppingBag, Star } from 'lucide-react';

interface Perfume {
    id: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    category: string;
    sub_category: string | null;
    image_path: string | null;
    created_at: string;
    updated_at: string;
    formatted_price: string;
    display_category: string;
}

interface PaginatedData {
    data: Perfume[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    perfumes: PaginatedData;
    categories: string[];
    filters: {
        search?: string;
        category?: string;
    };
    [key: string]: unknown;
}

export default function Welcome({ perfumes, categories, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/', { search: searchTerm, category: selectedCategory }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCategoryFilter = (category: string) => {
        const newCategory = category === selectedCategory ? '' : category;
        setSelectedCategory(newCategory);
        router.get('/', { search: searchTerm, category: newCategory }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handlePageChange = (url: string) => {
        router.get(url, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="✨ Perfume Catalog - Discover Your Perfect Scent" />
            
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
                {/* Header */}
                <div className="bg-white border-b shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-3">
                                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-lg">
                                    <Sparkles className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                        ✨ Perfume Catalog
                                    </h1>
                                    <p className="text-sm text-gray-600">Discover Your Perfect Scent</p>
                                </div>
                            </div>
                            <Link href={route('perfumes.create')}>
                                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Perfume
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            🌹 Exquisite Fragrance Collection
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Explore our curated collection of premium perfumes from the world's finest brands. 
                            Find your signature scent and make every moment memorable.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <ShoppingBag className="h-8 w-8 text-pink-500 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900">Premium Brands</h3>
                                <p className="text-sm text-gray-600 mt-1">Chanel, Dior, Tom Ford & more</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <Star className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900">Expert Curation</h3>
                                <p className="text-sm text-gray-600 mt-1">Hand-picked exceptional fragrances</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <Filter className="h-8 w-8 text-indigo-500 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900">Easy Discovery</h3>
                                <p className="text-sm text-gray-600 mt-1">Search by brand, category, or notes</p>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    type="text"
                                    placeholder="Search perfumes by name, brand, or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                                Search
                            </Button>
                        </form>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm font-medium text-gray-700 py-2">Categories:</span>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryFilter(category)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                            {selectedCategory && (
                                <button
                                    onClick={() => handleCategoryFilter('')}
                                    className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200"
                                >
                                    Clear Filter
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-600">
                            Showing {perfumes.data.length} of {perfumes.total} perfumes
                            {(searchTerm || selectedCategory) && ' (filtered)'}
                        </p>
                    </div>

                    {/* Perfume Grid */}
                    {perfumes.data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {perfumes.data.map((perfume) => (
                                <div key={perfume.id} className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow duration-200">
                                    <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                                        {perfume.image_path ? (
                                            <img
                                                src={`/storage/${perfume.image_path}`}
                                                alt={perfume.name}
                                                className="w-full h-full object-cover rounded-t-lg"
                                            />
                                        ) : (
                                            <div className="text-6xl opacity-50">🌸</div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-2">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800">
                                                {perfume.display_category}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{perfume.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{perfume.brand}</p>
                                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{perfume.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-green-600">
                                                ${perfume.price}
                                            </span>
                                            <Link href={route('perfumes.show', perfume.id)}>
                                                <Button size="sm" variant="outline" className="hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No perfumes found</h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm || selectedCategory
                                    ? 'Try adjusting your search or filters'
                                    : 'No perfumes in the catalog yet'}
                            </p>
                            <Link href={route('perfumes.create')}>
                                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add First Perfume
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {perfumes.last_page > 1 && (
                        <div className="flex justify-center mt-8">
                            <div className="flex space-x-1">
                                {perfumes.links.map((link, index) => (
                                    link.url ? (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(link.url!)}
                                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                                                link.active
                                                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                                                    : 'bg-white border text-gray-700 hover:bg-gray-50'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-md"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}