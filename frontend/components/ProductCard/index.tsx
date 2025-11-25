import Image from 'next/image';
import Link from 'next/link';
import { DiscountBadge } from './DiscountBadge';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    discount: number;
}

interface ProductCardProps {
    product: Product;
    apiUrl: string;
}

export function ProductCard({ product, apiUrl }: ProductCardProps) {
    const discountedPrice = product.discount > 0
        ? product.price * (1 - product.discount / 100)
        : product.price;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {product.image && (
                <div className="relative w-full h-48 overflow-hidden">
                    <Image
                        unoptimized={true}
                        src={`${apiUrl}${product.image}`}
                        alt={product.name}
                        fill
                        className="object-contain"
                        priority
                    />

                    {product.discount > 0 && (
                        <DiscountBadge discount={product.discount} />
                    )}
                </div>
            )}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                            R${discountedPrice.toFixed(2)}
                        </span>
                        {product.discount > 0 && (
                            <span className="text-lg text-gray-500 line-through">
                                R${product.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <Link
                        href={`/products/${product.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
}
