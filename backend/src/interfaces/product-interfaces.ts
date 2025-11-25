export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
}
