interface ProductActionButtonsProps {
    onAddToCart: () => void;
    onContinueShopping: () => void;
    isLoading?: boolean;
}

export function ProductActionButtons({
    onAddToCart,
    onContinueShopping,
    isLoading = false,
}: ProductActionButtonsProps) {
    return (
        <div className="space-y-4">
            <button
                onClick={onAddToCart}
                disabled={isLoading}
                className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
            </button>

            <button
                onClick={onContinueShopping}
                disabled={isLoading}
                className="w-full px-8 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
                Continuar Comprando
            </button>
        </div>
    );
}
