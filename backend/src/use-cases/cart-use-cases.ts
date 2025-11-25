import { CartItem, Cart } from '../interfaces/cart-interfaces';
import { ProductNotFoundError } from '../errors/product-errors';
import { InvalidCartOperationError, CartItemNotFoundError } from '../errors/cart-errors';
import { IProductRepository } from '../repositories/in-memory-product-repository';
import { ICartRepository } from '../repositories/in-memory-cart-repository';

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

        const { subtotal, discountAmount } = items.reduce((acc, item) => {
            const itemTotal = item.product.price * item.quantity;
            const discountPercent = item.product.discount || 0;
            const itemDiscount = itemTotal * (discountPercent / 100);

            return {
                subtotal: acc.subtotal + itemTotal,
                discountAmount: acc.discountAmount + itemDiscount
            };
        }, { subtotal: 0, discountAmount: 0 });

        const total = subtotal - discountAmount;

        return {
            items,
            subtotal: parseFloat(subtotal.toFixed(2)),
            discount: parseFloat(discountAmount.toFixed(2)),
            total: parseFloat(total.toFixed(2))
        };
    }
}

export class RemoveFromCartUseCase {
    constructor(private cartRepository: ICartRepository) { }

    execute(cartItemId: number): CartItem[] {
        return this.cartRepository.removeItem(cartItemId);
    }
}

export class UpdateCartItemQuantityUseCase {
    constructor(private cartRepository: ICartRepository) { }

    execute(cartItemId: number, quantity: number): CartItem[] {
        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new InvalidCartOperationError('quantity must be a number greater than 0');
        }

        const items = this.cartRepository.getAll();
        const itemExists = items.find(item => item.id === cartItemId);

        if (!itemExists) {
            throw new CartItemNotFoundError(cartItemId);
        }

        return this.cartRepository.updateQuantity(cartItemId, quantity);
    }
}

export class ClearCartUseCase {
    constructor(private cartRepository: ICartRepository) { }

    execute(): void {
        this.cartRepository.clear();
    }
}
