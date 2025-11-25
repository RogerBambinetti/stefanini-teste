'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ShoppingCart, User } from 'lucide-react';

export default function Header() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleBack = () => {
        router.back();
    };

    const handleCartToggle = useMemo(() => {
        return () => {
            const params = new URLSearchParams(searchParams);
            const hasShowCart = params.has('showCart');

            if (hasShowCart) {
                params.delete('showCart');
            } else {
                params.set('showCart', 'true');
            }

            const newUrl = `?${params.toString()}`;
            router.push(newUrl);
        };
    }, [searchParams, router]);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="shrink-0">
                        <h1 className="text-2xl font-bold text-gray-900">Ecommerce</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBack}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Voltar"
                            title="Voltar"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        <button
                            onClick={handleCartToggle}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Carrinho"
                            title="Carrinho"
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                        </button>

                        <button
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-not-allowed opacity-60"
                            aria-label="Usuário"
                            title="Usuário (indisponível)"
                            disabled
                        >
                            <User className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
