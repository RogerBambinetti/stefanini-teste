import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
            res.status(StatusCodes.OK).json(product);
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                res.status(StatusCodes.NOT_FOUND).json({ error: (error as Error).message });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching product' });
            }
        }
    }

    listProducts(req: Request, res: Response): void {
        try {
            const products = this.listProductsUseCase.execute();
            res.status(StatusCodes.OK).json(products);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error listing products' });
        }
    }
}
