interface ProductActionButtonsProps {
    onAddToCart: () => void;
    onContinueShopping: () => void;
}

export function ProductActionButtons({
    onAddToCart,
    onContinueShopping,
}: ProductActionButtonsProps) {
    return (
        <div className="space-y-4">
            <button
                onClick={onAddToCart}
                className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
                Adicionar ao Carrinho
            </button>

            <button
                onClick={onContinueShopping}
                className="w-full px-8 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
                Continuar Comprando
            </button>
        </div>
    );
}
