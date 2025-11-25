import { Product, CartItem, Cart } from '../interfaces/product-interfaces';
import { ProductNotFoundError, InvalidCartOperationError } from '../errors/product-errors';
import { IProductRepository, ICartRepository } from '../repositories/in-memory-product-repository';

export class GetProductUseCase {
    constructor(private repository: IProductRepository) { }

    execute(id: number): Product {
        const product = this.repository.findById(id);

        if (!product) {
            throw new ProductNotFoundError(id);
        }

        return product;
    }
}

export class ListProductsUseCase {
    constructor(private repository: IProductRepository) { }

    execute(): Product[] {
        return this.repository.findAll();
    }
}

export class AddToCartUseCase {
    constructor(
        private productRepository: IProductRepository,
        private cartRepository: ICartRepository
    ) { }

    execute(productId: number, quantity: number): CartItem[] {
        if (!productId || !quantity) {
            throw new InvalidCartOperationError('productId and quantity are required');
        }

        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new InvalidCartOperationError('quantity must be a number greater than 0');
        }

        const product = this.productRepository.findById(productId);
        if (!product) {
            throw new ProductNotFoundError(productId);
        }

        return this.cartRepository.add(productId, quantity);
    }
}

export class GetCartUseCase {
    constructor(private cartRepository: ICartRepository) { }

    execute(): Cart {
        const items = this.cartRepository.getAll();
        const total = items.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);

        return {
            items,
            total: parseFloat(total.toFixed(2))
        };
    }
}
