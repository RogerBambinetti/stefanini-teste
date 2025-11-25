import { Product } from '../interfaces/product-interfaces';
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
