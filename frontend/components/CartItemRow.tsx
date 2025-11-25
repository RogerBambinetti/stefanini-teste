'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface CartItemRowProps {
    id: number;
    product: Product;
    quantity: number;
    apiUrl: string;
    onRemove: (cartItemId: number) => void;
}

export function CartItemRow({ id, product, quantity, apiUrl, onRemove }: CartItemRowProps) {
    return (
        <div className="flex gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
            {product.image && (
                <Image
                    src={`${apiUrl}${product.image}`}
                    alt={product.name}
                    width={64}
                    height={64}
                    unoptimized={true}
                    className="w-16 h-16 object-contain rounded shrink-0"
                />
            )}

            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate text-sm">
                    {product.name}
                </h3>
                <p className="text-gray-600 text-xs mt-1">
                    R$ {product.price.toFixed(2)} x {quantity}
                </p>
            </div>

            <button
                onClick={() => onRemove(id)}
                className="w-10 h-10 rounded hover:bg-red-100 transition-colors shrink-0 flex items-center justify-center"
                aria-label="Remover item"
            >
                <Trash2 className="w-4 h-4 text-red-600" />
            </button>
        </div>
    );
}
