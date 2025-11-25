import { CartItem } from '../interfaces/cart-interfaces';
import { IProductRepository } from './in-memory-product-repository';
import { ProductNotFoundError } from '../errors/product-errors';

export interface ICartRepository {
    add(productId: number, quantity: number): CartItem[];
    getAll(): CartItem[];
    clear(): void;
    removeItem(cartItemId: number): CartItem[];
    updateQuantity(cartItemId: number, quantity: number): CartItem[];
}

export class InMemoryCartRepository implements ICartRepository {
    private cart: CartItem[] = [];
    private nextId = 1;

    constructor(private productRepository: IProductRepository) { }

    add(productId: number, quantity: number): CartItem[] {
        const product = this.productRepository.findById(productId);

        if (!product) {
            throw new ProductNotFoundError(productId);
        }

        const existingItem = this.cart.find(item => item.product.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newCartItem: CartItem = {
                id: this.nextId++,
                product,
                quantity
            };
            this.cart.push(newCartItem);
        }

        return this.cart;
    }

    getAll(): CartItem[] {
        return this.cart;
    }

    clear(): void {
        this.cart = [];
        this.nextId = 1;
    }

    removeItem(cartItemId: number): CartItem[] {
        this.cart = this.cart.filter(item => item.id !== cartItemId);
        return this.cart;
    }

    updateQuantity(cartItemId: number, quantity: number): CartItem[] {
        const item = this.cart.find(item => item.id === cartItemId);
        if (item) {
            item.quantity = quantity;
        }
        return this.cart;
    }
}
