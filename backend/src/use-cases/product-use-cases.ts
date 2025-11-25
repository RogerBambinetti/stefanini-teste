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

    execute(productId: number, quantidade: number): CartItem[] {
        if (!productId || !quantidade) {
            throw new InvalidCartOperationError('productId e quantidade são obrigatórios');
        }

        if (typeof quantidade !== 'number' || quantidade <= 0) {
            throw new InvalidCartOperationError('quantidade deve ser um número maior que 0');
        }

        const product = this.productRepository.findById(productId);
        if (!product) {
            throw new ProductNotFoundError(productId);
        }

        return this.cartRepository.add(productId, quantidade);
    }
}

export class GetCartUseCase {
    constructor(private cartRepository: ICartRepository) { }

    execute(): Cart {
        const items = this.cartRepository.getAll();
        const total = items.reduce((sum, item) => {
            return sum + (item.product.preco * item.quantidade);
        }, 0);

        return {
            items,
            total: parseFloat(total.toFixed(2))
        };
    }
}
