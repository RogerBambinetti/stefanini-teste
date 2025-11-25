import { Request, Response } from 'express';
import {
    AddToCartUseCase,
    GetCartUseCase,
    RemoveFromCartUseCase,
    UpdateCartItemQuantityUseCase,
    ClearCartUseCase
} from '../../use-cases/cart-use-cases';
import {
    InvalidCartOperationError,
    CartItemNotFoundError
} from '../../errors/cart-errors';
import { ProductNotFoundError } from '../../errors/product-errors';

export class CartController {
    constructor(
        private addToCartUseCase: AddToCartUseCase,
        private getCartUseCase: GetCartUseCase,
        private removeFromCartUseCase: RemoveFromCartUseCase,
        private updateCartItemQuantityUseCase: UpdateCartItemQuantityUseCase,
        private clearCartUseCase: ClearCartUseCase
    ) { }

    addToCart(req: Request, res: Response): void {
        try {
            const { productId, quantity } = req.body;

            this.addToCartUseCase.execute(productId, quantity);

            res.status(201).json({
                message: 'Product added to cart successfully',
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

    removeFromCart(req: Request, res: Response): void {
        try {
            const { cartItemId } = req.params;
            const itemId = parseInt(cartItemId);
            const cart = this.removeFromCartUseCase.execute(itemId);
            res.status(200).json({
                message: 'Product removed from cart successfully',
                cart
            });
        } catch (error) {
            res.status(500).json({ error: 'Error removing product from cart' });
        }
    }

    updateCartItemQuantity(req: Request, res: Response): void {
        try {
            const { cartItemId } = req.params;
            const { quantity } = req.body;
            const itemId = parseInt(cartItemId);
            const cart = this.updateCartItemQuantityUseCase.execute(itemId, quantity);
            res.status(200).json({
                message: 'Cart item quantity updated successfully',
                cart
            });
        } catch (error) {
            if (error instanceof CartItemNotFoundError) {
                res.status(404).json({ error: (error as Error).message });
            } else if (error instanceof InvalidCartOperationError) {
                res.status(400).json({ error: (error as Error).message });
            } else {
                res.status(500).json({ error: 'Error updating cart item quantity' });
            }
        }
    }

    clearCart(req: Request, res: Response): void {
        try {
            this.clearCartUseCase.execute();
            res.status(200).json({
                message: 'Cart cleared successfully'
            });
        } catch (error) {
            res.status(500).json({ error: 'Error clearing cart' });
        }
    }
}
