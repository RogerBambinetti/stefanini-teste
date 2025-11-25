'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    discount: number;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/api/products`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.statusText}`);
                }

                const data = await response.json();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold text-gray-600">Carregando produtos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold text-red-600">Erro: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500">Nenhum produto disponível</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {product.image && (
                                    <div className="relative w-full h-48 bg-gray-200 overflow-hidden">

                                        {product.discount > 0 && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                -{product.discount}%
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-gray-900">
                                                R${product.price.toFixed(2)}
                                            </span>
                                            {product.discount > 0 && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    R${(product.price / (1 - product.discount / 100)).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block text-center"
                                    >
                                        Ver Produto
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
