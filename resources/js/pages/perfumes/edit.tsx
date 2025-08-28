import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';

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
}

interface PerfumeFormData {
    name: string;
    brand: string;
    description: string;
    price: string;
    category: string;
    sub_category: string;
    image?: File;
    [key: string]: string | File | undefined;
}

interface Categories {
    [key: string]: string[];
}

interface Props {
    perfume: Perfume;
    categories: Categories;
    [key: string]: unknown;
}

export default function Edit({ perfume, categories }: Props) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [subCategories, setSubCategories] = useState<string[]>(categories[perfume.category] || []);

    const { data, setData, processing, errors } = useForm<PerfumeFormData>({
        name: perfume.name,
        brand: perfume.brand,
        description: perfume.description,
        price: perfume.price.toString(),
        category: perfume.category,
        sub_category: perfume.sub_category || '',
        image: undefined,
    });

    const handleCategoryChange = (category: string) => {
        setData('category', category);
        setData('sub_category', '');
        setSubCategories(categories[category] || []);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Use router.post with _method for file uploads
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', data.name);
        formData.append('brand', data.brand);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('sub_category', data.sub_category);
        
        if (data.image) {
            formData.append('image', data.image);
        }
        
        router.post(route('perfumes.update', perfume.id), formData, {
            forceFormData: true,
        });
    };

    const currentImageUrl = selectedImage || (perfume.image_path ? `/storage/${perfume.image_path}` : null);

    return (
        <>
            <Head title={`Edit ${perfume.name} | Perfume Catalog`} />
            
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
                {/* Header */}
                <div className="bg-white border-b shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-6">
                            <div className="flex items-center space-x-4">
                                <Link href={route('perfumes.show', perfume.id)}>
                                    <Button variant="ghost" size="sm">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Details
                                    </Button>
                                </Link>
                                <div className="h-6 border-l border-gray-300" />
                                <h1 className="text-2xl font-bold text-gray-900">Edit Perfume</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">✏️ Edit {perfume.name}</h2>
                            <p className="text-gray-600">Update the details below to modify this perfume in your catalog.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Image Upload Section */}
                                <div className="space-y-4">
                                    <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                                        Product Image
                                    </Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                        {currentImageUrl ? (
                                            <div className="relative">
                                                <img
                                                    src={currentImageUrl}
                                                    alt="Preview"
                                                    className="mx-auto max-h-64 rounded-lg"
                                                />
                                                <div className="mt-3 space-x-2">
                                                    <Label
                                                        htmlFor="image"
                                                        className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                    >
                                                        Change Image
                                                        <Input
                                                            id="image"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="sr-only"
                                                        />
                                                    </Label>
                                                    {selectedImage && (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedImage(null);
                                                                setData('image', undefined);
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="text-6xl mb-4 opacity-50">🌸</div>
                                                <Label
                                                    htmlFor="image"
                                                    className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-500"
                                                >
                                                    Click to upload an image
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="sr-only"
                                                    />
                                                </Label>
                                                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 2MB</p>
                                            </div>
                                        )}
                                    </div>
                                    {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                                Perfume Name *
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="e.g., Chanel No. 5"
                                                className="mt-1"
                                            />
                                            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="brand" className="text-sm font-medium text-gray-700">
                                                Brand *
                                            </Label>
                                            <Input
                                                id="brand"
                                                type="text"
                                                value={data.brand}
                                                onChange={(e) => setData('brand', e.target.value)}
                                                placeholder="e.g., Chanel"
                                                className="mt-1"
                                            />
                                            {errors.brand && <p className="text-sm text-red-600 mt-1">{errors.brand}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                                            Price (USD) *
                                        </Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            placeholder="0.00"
                                            className="mt-1"
                                        />
                                        {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                                                Category *
                                            </Label>
                                            <select
                                                id="category"
                                                value={data.category}
                                                onChange={(e) => handleCategoryChange(e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                                            >
                                                <option value="">Select Category</option>
                                                {Object.keys(categories).map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="sub_category" className="text-sm font-medium text-gray-700">
                                                Sub-category
                                            </Label>
                                            <select
                                                id="sub_category"
                                                value={data.sub_category}
                                                onChange={(e) => setData('sub_category', e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                                                disabled={!data.category}
                                            >
                                                <option value="">Select Sub-category</option>
                                                {subCategories.map((subCategory) => (
                                                    <option key={subCategory} value={subCategory}>
                                                        {subCategory}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.sub_category && <p className="text-sm text-red-600 mt-1">{errors.sub_category}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                                    Description *
                                </Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe the perfume's scent profile, notes, and characteristics..."
                                    className="mt-1"
                                />
                                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                            </div>

                            {/* Submit Section */}
                            <div className="border-t pt-6">
                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Updating Perfume...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Update Perfume
                                            </>
                                        )}
                                    </Button>
                                    <Link href={route('perfumes.show', perfume.id)}>
                                        <Button type="button" variant="outline" disabled={processing}>
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}