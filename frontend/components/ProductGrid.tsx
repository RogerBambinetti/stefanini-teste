interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    discount: number;
}

interface ProductGridProps {
    products: Product[];
    apiUrl: string;
}

export function ProductGrid({ products, apiUrl }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Import ProductCard dinamicamente se necessário */}
        </div>
    );
}
