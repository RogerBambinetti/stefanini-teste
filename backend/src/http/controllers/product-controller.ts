import { Request, Response } from 'express';
import {
    GetProductUseCase,
    ListProductsUseCase,
    AddToCartUseCase,
    GetCartUseCase
} from '../../use-cases/product-use-cases';
import {
    ProductNotFoundError,
    InvalidCartOperationError
} from '../../errors/product-errors';

export class ProductController {
    constructor(
        private getProductUseCase: GetProductUseCase,
        private listProductsUseCase: ListProductsUseCase,
        private addToCartUseCase: AddToCartUseCase,
        private getCartUseCase: GetCartUseCase
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

    addToCart(req: Request, res: Response): void {
        try {
            const { productId, quantity } = req.body;
            const cart = this.addToCartUseCase.execute(productId, quantity);
            res.status(201).json({
                message: 'Product added to cart successfully',
                cart
            });
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                res.status(404).json({ error: (error as Error).message });
            } else if (error instanceof InvalidCartOperationError) {
                res.status(400).json({ error: (error as Error).message });
            } else {
                res.status(500).json({ error: 'Error adding product to cart' });
            }
        }
    }

    getCart(req: Request, res: Response): void {
        try {
            const cart = this.getCartUseCase.execute();
            res.status(200).json({
                items: cart.items,
                itemCount: cart.items.length,
                total: cart.total
            });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching cart' });
        }
    }
}
