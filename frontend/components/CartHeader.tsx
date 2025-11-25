'use client';

import { X } from 'lucide-react';

interface CartHeaderProps {
    onClose: () => void;
}

export function CartHeader({ onClose }: CartHeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">Seu Carrinho</h2>
            </div>
            <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Fechar carrinho"
            >
                <X className="w-5 h-5 text-gray-600" />
            </button>
        </div>
    );
}
