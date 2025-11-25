'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import {
    ProductImageSection,
    ProductDetailsSection,
    ProductPriceSection,
    ProductQuantitySelector,
    ProductActionButtons,
} from '@/components/ProductDetails';
import { SuccessToast } from '@/components/SuccessToast';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    discount: number;
}

export default function ProductDetailPage() {
    const searchParams = useSearchParams();
    const params = useParams();
    const router = useRouter();
    const productId = params?.productId as string;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [cartSuccess, setCartSuccess] = useState(false);

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
    }, [productId, apiUrl]);

    const handleAddToCart = async () => {
        if (!product) return;

        setIsAddingToCart(true);
        setCartSuccess(false);

        try {
            const response = await fetch(`${apiUrl}/api/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: quantity,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to add product to cart: ${response.statusText}`);
            }

            setCartSuccess(true);
            setQuantity(1);

            const newSearchparams = new URLSearchParams(searchParams);
            newSearchparams.set('showCart', 'true');
            newSearchparams.set('refetchCart', Date.now().toString());
            router.push(`?${newSearchparams.toString()}`);

            setTimeout(() => {
                setCartSuccess(false);
            }, 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao adicionar ao carrinho');
        } finally {
            setIsAddingToCart(false);

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
        return <LoadingState message="Carregando produto..." />;
    }

    if (error || !product) {
        return <ErrorState error={error || 'Produto não encontrado'} />;
    }

    const discountedPrice = calculateDiscountedPrice(product.price, product.discount);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 bg-white rounded-lg shadow-lg overflow-hidden">
                    <ProductImageSection
                        image={product.image}
                        productName={product.name}
                        discount={product.discount}
                        apiUrl={apiUrl || ''}
                    />

                    <div className="p-8 flex flex-col justify-between">
                        <div>
                            <ProductDetailsSection
                                name={product.name}
                                description={product.description}
                                productId={product.id}
                            />
                            <ProductPriceSection
                                originalPrice={product.price}
                                discountPercentage={product.discount}
                                discountedPrice={discountedPrice}
                            />
                        </div>

                        <div className="space-y-4">
                            <ProductQuantitySelector
                                quantity={quantity}
                                onQuantityChange={handleQuantityChange}
                            />
                            <ProductActionButtons
                                onAddToCart={handleAddToCart}
                                onContinueShopping={() => router.push('/products')}
                                isLoading={isAddingToCart}
                            />
                            <SuccessToast
                                message="Produto adicionado ao carrinho com sucesso!"
                                isVisible={cartSuccess}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
