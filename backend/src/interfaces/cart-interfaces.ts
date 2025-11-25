import { Product } from './product-interfaces';

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
}
