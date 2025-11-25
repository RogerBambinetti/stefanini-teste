'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    discount: number;
}

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params?.productId as string;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/products/${productId}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch product: ${response.statusText}`);
                }

                const data = await response.json();
                setProduct(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (product) {
            console.log(`Added ${quantity} of ${product.name} to cart`);
        }
    };

    const handleQuantityChange = (value: number) => {
        if (value >= 1) {
            setQuantity(value);
        }
    };

    const calculateDiscountedPrice = (price: number, discount: number) => {
        return price * (1 - discount / 100);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold text-gray-600">Carregando produto...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-xl font-semibold text-red-600 mb-4">
                        {error ? `Erro: ${error}` : 'Produto não encontrado'}
                    </div>
                </div>
            </div>
        );
    }

    const discountedPrice = calculateDiscountedPrice(product.price, product.discount);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative h-96 lg:h-full bg-gray-200 flex items-center justify-center">
                        {product.image ? (
                            <Image
                                unoptimized={true}
                                src={`${apiUrl}${product.image}`}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="text-gray-400 text-center">
                                <p className="text-xl font-semibold">Nenhuma imagem disponível</p>
                            </div>
                        )}
                        {product.discount > 0 && (
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                                -{product.discount}%
                            </div>
                        )}
                    </div>

                    <div className="p-8 flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-3xl font-bold text-gray-900">
                                        R${discountedPrice.toFixed(2)}
                                    </span>
                                    {product.discount > 0 && (
                                        <span className="text-lg text-gray-500 line-through">
                                            R${product.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                {product.discount > 0 && (
                                    <p className="text-green-600 font-semibold">
                                        Economize R${(product.price - discountedPrice).toFixed(2)} ({product.discount}% de desconto)
                                    </p>
                                )}
                            </div>

                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                    Descrição
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <p className="text-sm text-gray-500">
                                    ID do Produto: <span className="font-semibold">{product.id}</span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <label htmlFor="quantity" className="font-semibold text-gray-900">
                                    Quantidade:
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        −
                                    </button>
                                    <input
                                        id="quantity"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                        className="w-16 text-center border-l border-r border-gray-300 py-2 focus:outline-none"
                                        min="1"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                            >
                                Adicionar ao Carrinho
                            </button>

                            <button
                                onClick={() => router.push('/products')}
                                className="w-full px-8 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Continuar Comprando
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Produtos Relacionados
                    </h2>
                    <p className="text-gray-500 text-center py-8">
                        Produtos relacionados em breve...
                    </p>
                </div>
            </div>
        </div>
    );
}
