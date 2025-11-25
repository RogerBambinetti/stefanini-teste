interface DiscountBadgeProps {
    discount: number;
}

export function DiscountBadge({ discount }: DiscountBadgeProps) {
    if (discount <= 0) return null;

    return (
        <div className="absolute top-2 right-2 bg-green-400 text-white px-3 py-1 rounded text-sm font-semibold">
            -{discount}%
        </div>
    );
}
