import { Product } from '../interfaces/product-interfaces';
import { ProductNotFoundError } from '../errors/product-errors';
import { IProductRepository } from '../repositories/in-memory-product-repository';

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
