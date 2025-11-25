import { Product, CartItem } from '../interfaces/product-interfaces';
import { mockProducts } from './mock-data';

export interface IProductRepository {
    findById(id: number): Product | undefined;
    findAll(): Product[];
}

export class InMemoryProductRepository implements IProductRepository {
    private products: Product[] = mockProducts;

    findById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    findAll(): Product[] {
        return this.products;
    }
}

export interface ICartRepository {
    add(productId: number, quantidade: number): CartItem[];
    getAll(): CartItem[];
    clear(): void;
}

export class InMemoryCartRepository implements ICartRepository {
    private cart: CartItem[] = [];
    private nextId = 1;

    add(productId: number, quantidade: number): CartItem[] {
        const repository = new InMemoryProductRepository();
        const product = repository.findById(productId);

        if (!product) {
            throw new Error(`Produto com ID ${productId} não encontrado`);
        }

        const existingItem = this.cart.find(item => item.product.id === productId);

        if (existingItem) {
            existingItem.quantidade += quantidade;
        } else {
            const newCartItem: CartItem = {
                id: this.nextId++,
                product,
                quantidade
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
}
