export interface Product {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    foto: string;
}

export interface CartItem {
    id: number;
    product: Product;
    quantidade: number;
}
