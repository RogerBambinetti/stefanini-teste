interface ProductDetailsSectionProps {
    name: string;
    description: string;
    productId: number;
}

export function ProductDetailsSection({
    name,
    description,
    productId,
}: ProductDetailsSectionProps) {
    return (
        <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>

            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            <div className="mb-8">
                <p className="text-sm text-gray-500">
                    ID do Produto: <span className="font-semibold">{productId}</span>
                </p>
            </div>
        </>
    );
}
