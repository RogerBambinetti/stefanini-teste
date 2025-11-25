interface ProductPriceSectionProps {
    originalPrice: number;
    discountPercentage: number;
    discountedPrice: number;
}

export function ProductPriceSection({
    originalPrice,
    discountPercentage,
    discountedPrice,
}: ProductPriceSectionProps) {
    const savingsAmount = originalPrice - discountedPrice;

    return (
        <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                    R${discountedPrice.toFixed(2)}
                </span>
                {discountPercentage > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                        R${originalPrice.toFixed(2)}
                    </span>
                )}
            </div>
            {discountPercentage > 0 && (
                <p className="text-green-600 font-semibold">
                    Economize R${savingsAmount.toFixed(2)} ({discountPercentage}% de desconto)
                </p>
            )}
        </div>
    );
}
