import { Router } from 'express';
import { ProductController } from './controllers/product-controller';
import { CartController } from './controllers/cart-controller';
import { InMemoryProductRepository } from '../repositories/in-memory-product-repository';
import { InMemoryCartRepository } from '../repositories/in-memory-cart-repository';
import {
    GetProductUseCase,
    ListProductsUseCase
} from '../use-cases/product-use-cases';
import {
    AddToCartUseCase,
    GetCartUseCase,
    RemoveFromCartUseCase,
    UpdateCartItemQuantityUseCase,
    ClearCartUseCase
} from '../use-cases/cart-use-cases';

const router = Router();

const productRepository = new InMemoryProductRepository();
const cartRepository = new InMemoryCartRepository(productRepository);

// Product use cases
const getProductUseCase = new GetProductUseCase(productRepository);
const listProductsUseCase = new ListProductsUseCase(productRepository);

// Cart use cases
const addToCartUseCase = new AddToCartUseCase(productRepository, cartRepository);
const getCartUseCase = new GetCartUseCase(cartRepository);
const removeFromCartUseCase = new RemoveFromCartUseCase(cartRepository);
const updateCartItemQuantityUseCase = new UpdateCartItemQuantityUseCase(cartRepository);
const clearCartUseCase = new ClearCartUseCase(cartRepository);

// Controllers
const productController = new ProductController(
    getProductUseCase,
    listProductsUseCase
);

const cartController = new CartController(
    addToCartUseCase,
    getCartUseCase,
    removeFromCartUseCase,
    updateCartItemQuantityUseCase,
    clearCartUseCase
);

// Product routes
router.get('/products', (req, res) => productController.listProducts(req, res));
router.get('/products/:id', (req, res) => productController.getProductById(req, res));

// Cart routes
router.post('/cart/add', (req, res) => cartController.addToCart(req, res));
router.get('/cart', (req, res) => cartController.getCart(req, res));
router.delete('/cart/items/:cartItemId', (req, res) => cartController.removeFromCart(req, res));
router.put('/cart/items/:cartItemId', (req, res) => cartController.updateCartItemQuantity(req, res));
router.delete('/cart', (req, res) => cartController.clearCart(req, res));

export default router;
