'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CartModal } from './CartModal';
import { CartHeader } from './CartHeader';
import { CartItemsList } from './CartItemsList';
import { CartSummary } from './CartSummary';

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
    }, [showCart, searchParams.get('refetchCart')]);

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

            const newSearchparams = new URLSearchParams(searchParams);
            newSearchparams.set('refetchCart', Date.now().toString());
            router.push(`?${newSearchparams.toString()}`);

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
        <CartModal>
            <CartHeader onClose={handleClose} />

            <div className="flex-1 overflow-y-auto p-4">
                <CartItemsList
                    items={cart?.items || []}
                    loading={loading}
                    error={error}
                    apiUrl={apiUrl || ''}
                    onRemoveItem={handleRemoveItem}
                />
            </div>

            {!loading && cart && cart.items.length > 0 && (
                <CartSummary
                    subtotal={cart.subtotal}
                    discount={cart.discount}
                    total={cart.total}
                    onClearCart={handleClearCart}
                />
            )}
        </CartModal>
    );
}
