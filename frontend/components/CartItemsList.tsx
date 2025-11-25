'use client';

import { ShoppingCart } from 'lucide-react';
import { CartItemRow } from './CartItemRow';

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

interface CartItemsListProps {
    items: CartItem[];
    loading: boolean;
    error: string | null;
    apiUrl: string;
    onRemoveItem: (cartItemId: number) => void;
}

export function CartItemsList({
    items,
    loading,
    error,
    apiUrl,
    onRemoveItem,
}: CartItemsListProps) {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Carregando carrinho...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                <p className="text-red-700 text-sm">{error}</p>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="w-12 h-12 text-gray-300 mb-2" />
                <p className="text-gray-500">Seu carrinho está vazio</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <CartItemRow
                    key={item.id}
                    id={item.id}
                    product={item.product}
                    quantity={item.quantity}
                    apiUrl={apiUrl}
                    onRemove={onRemoveItem}
                />
            ))}
        </div>
    );
}
