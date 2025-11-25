interface ProductQuantitySelectorProps {
    quantity: number;
    onQuantityChange: (value: number) => void;
}

export function ProductQuantitySelector({
    quantity,
    onQuantityChange,
}: ProductQuantitySelectorProps) {
    return (
        <div className="flex items-center gap-4">
            <label htmlFor="quantity" className="font-semibold text-gray-900">
                Quantidade:
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                    onClick={() => onQuantityChange(quantity - 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    −
                </button>
                <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-l border-r border-gray-300 py-2 focus:outline-none"
                    min="1"
                />
                <button
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    +
                </button>
            </div>
        </div>
    );
}
