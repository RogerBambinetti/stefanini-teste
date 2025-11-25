import { Request, Response } from 'express';
import {
    GetProductUseCase,
    ListProductsUseCase
} from '../../use-cases/product-use-cases';
import { ProductNotFoundError } from '../../errors/product-errors';

export class ProductController {
    constructor(
        private getProductUseCase: GetProductUseCase,
        private listProductsUseCase: ListProductsUseCase
    ) { }

    getProductById(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id);
            const product = this.getProductUseCase.execute(id);
            res.status(200).json(product);
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                res.status(404).json({ error: (error as Error).message });
            } else {
                res.status(500).json({ error: 'Error fetching product' });
            }
        }
    }

    listProducts(req: Request, res: Response): void {
        try {
            const products = this.listProductsUseCase.execute();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error listing products' });
        }
    }
}
