import Image from 'next/image';
import { DiscountBadge } from './DiscountBadge';

interface ProductImageSectionProps {
    image: string | null;
    productName: string;
    discount: number;
    apiUrl: string;
}

export function ProductImageSection({
    image,
    productName,
    discount,
    apiUrl,
}: ProductImageSectionProps) {
    return (
        <div className="relative h-96 lg:h-full bg-gray-200 flex items-center justify-center">
            {image ? (
                <>
                    <Image
                        unoptimized={true}
                        src={`${apiUrl}${image}`}
                        alt={productName}
                        fill
                        className="object-cover"
                        priority
                    />
                    <DiscountBadge discount={discount} />
                </>
            ) : (
                <div className="text-gray-400 text-center">
                    <p className="text-xl font-semibold">Nenhuma imagem disponível</p>
                </div>
            )}
        </div>
    );
}
