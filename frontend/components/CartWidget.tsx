'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

interface Cart {
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
}

export default function CartWidget() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const showCart = useMemo(() => {
        return searchParams.get('showCart') === 'true';
    }, [searchParams]);

    useEffect(() => {
        if (!showCart) return;

        const fetchCart = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`${apiUrl}/api/cart`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Falha ao carregar o carrinho');
                }

                const data = await response.json();
                setCart(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [showCart]);

    const handleClose = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('showCart');
        router.push(`?${params.toString()}`);
    };

    const handleRemoveItem = async (cartItemId: number) => {
        try {
            const response = await fetch(`${apiUrl}/api/cart/items/${cartItemId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Falha ao remover item');
            }

            if (cart) {
                setCart({
                    ...cart,
                    items: cart.items.filter(item => item.id !== cartItemId),
                });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao remover item');
        }
    };

    const handleClearCart = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/cart`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Falha ao limpar carrinho');
            }

            setCart({
                items: [],
                subtotal: 0,
                discount: 0,
                total: 0,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao limpar carrinho');
        }
    };

    if (!showCart) return null;

    return (
        <>
            <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col max-h-96">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-gray-900">Seu Carrinho</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Fechar carrinho"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {loading && (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Carregando carrinho...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    {!loading && cart && cart.items.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingCart className="w-12 h-12 text-gray-300 mb-2" />
                            <p className="text-gray-500">Seu carrinho está vazio</p>
                        </div>
                    )}

                    {!loading && cart && cart.items.length > 0 && (
                        <div className="space-y-3">
                            {cart.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                                >
                                    {item.product.image && (
                                        <Image
                                            src={`${apiUrl}${item.product.image}`}
                                            alt={item.product.name}
                                            width={64}
                                            height={64}
                                            unoptimized={true}
                                            className="w-16 h-16 object-contain rounded shrink-0"
                                        />
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 truncate text-sm">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-gray-600 text-xs mt-1">
                                            R$ {item.product.price.toFixed(2)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="p-4 rounded hover:bg-red-100 transition-colors shrink-0"
                                        aria-label="Remover item"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {!loading && cart && cart.items.length > 0 && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
                        <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="text-gray-900 font-medium">
                                    R$
                                </span>
                            </div>

                            {cart.discount > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Desconto:</span>
                                    <span className="text-green-600 font-medium">
                                        -R$
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
                                <span className="text-gray-900">Total:</span>
                                <span className="text-gray-900">
                                    R$ {cart.total.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleClearCart}
                            className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                            Limpar Carrinho
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
