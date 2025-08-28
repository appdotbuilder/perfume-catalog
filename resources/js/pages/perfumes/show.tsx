import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Calendar, Tag, DollarSign } from 'lucide-react';

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

interface Props {
    perfume: Perfume;
    [key: string]: unknown;
}

export default function Show({ perfume }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this perfume from the catalog? This action cannot be undone.')) {
            router.delete(route('perfumes.destroy', perfume.id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            <Head title={`${perfume.name} - ${perfume.brand} | Perfume Catalog`} />
            
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
                {/* Header */}
                <div className="bg-white border-b shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-6">
                            <div className="flex items-center space-x-4">
                                <Link href={route('perfumes.index')}>
                                    <Button variant="ghost" size="sm">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Catalog
                                    </Button>
                                </Link>
                                <div className="h-6 border-l border-gray-300" />
                                <h1 className="text-2xl font-bold text-gray-900">Perfume Details</h1>
                            </div>
                            <div className="flex space-x-3">
                                <Link href={route('perfumes.edit', perfume.id)}>
                                    <Button variant="outline">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    onClick={handleDelete}
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                            {/* Image Section */}
                            <div className="space-y-4">
                                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                                    {perfume.image_path ? (
                                        <img
                                            src={`/storage/${perfume.image_path}`}
                                            alt={perfume.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <div className="text-8xl mb-4 opacity-50">🌸</div>
                                            <p className="text-gray-500">No image available</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center space-x-3 mb-3">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800">
                                            <Tag className="w-3 h-3 mr-1" />
                                            {perfume.display_category}
                                        </span>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{perfume.name}</h1>
                                    <p className="text-xl text-gray-600 mb-4">by {perfume.brand}</p>
                                    <div className="flex items-center space-x-2 mb-6">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                        <span className="text-2xl font-bold text-green-600">${perfume.price}</span>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-gray-700 leading-relaxed">{perfume.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Added to Catalog
                                        </h3>
                                        <p className="text-gray-700">{formatDate(perfume.created_at)}</p>
                                    </div>
                                    
                                    {perfume.created_at !== perfume.updated_at && (
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                Last Updated
                                            </h3>
                                            <p className="text-gray-700">{formatDate(perfume.updated_at)}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Perfume Details</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-700">Brand:</span>
                                            <span className="ml-2 text-gray-600">{perfume.brand}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Category:</span>
                                            <span className="ml-2 text-gray-600">{perfume.category}</span>
                                        </div>
                                        {perfume.sub_category && (
                                            <div>
                                                <span className="font-medium text-gray-700">Sub-category:</span>
                                                <span className="ml-2 text-gray-600">{perfume.sub_category}</span>
                                            </div>
                                        )}
                                        <div>
                                            <span className="font-medium text-gray-700">Price:</span>
                                            <span className="ml-2 text-gray-600">${perfume.price}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t">
                                    <Link href={route('perfumes.edit', perfume.id)} className="flex-1">
                                        <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                                            <Edit className="w-4 h-4 mr-2" />
                                            Edit Perfume
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        onClick={handleDelete}
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Perfume
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}