'use client';

interface CartSummaryProps {
    subtotal: number;
    discount: number;
    total: number;
    onClearCart: () => void;
}

export function CartSummary({
    subtotal,
    discount,
    total,
    onClearCart,
}: CartSummaryProps) {
    return (
        <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
            <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900 font-medium">
                        R$ {subtotal.toFixed(2)}
                    </span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Desconto:</span>
                        <span className="text-green-600 font-medium">
                            -R$ {discount.toFixed(2)}
                        </span>
                    </div>
                )}

                <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">
                        R$ {total.toFixed(2)}
                    </span>
                </div>
            </div>

            <button
                onClick={onClearCart}
                className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
                Limpar Carrinho
            </button>
        </div>
    );
}
