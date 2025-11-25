import { Router } from 'express';
import { ProductController } from './controllers/product-controller';
import { InMemoryProductRepository } from '../repositories/in-memory-product-repository';
import { InMemoryCartRepository } from '../repositories/in-memory-product-repository';
import {
    GetProductUseCase,
    ListProductsUseCase,
    AddToCartUseCase,
    GetCartUseCase
} from '../use-cases/product-use-cases';

const router = Router();

const productRepository = new InMemoryProductRepository();
const cartRepository = new InMemoryCartRepository();

const getProductUseCase = new GetProductUseCase(productRepository);
const listProductsUseCase = new ListProductsUseCase(productRepository);
const addToCartUseCase = new AddToCartUseCase(productRepository, cartRepository);
const getCartUseCase = new GetCartUseCase(cartRepository);

const productController = new ProductController(
    getProductUseCase,
    listProductsUseCase,
    addToCartUseCase,
    getCartUseCase
);

router.get('/products', (req, res) => productController.listProducts(req, res));
router.get('/products/:id', (req, res) => productController.getProductById(req, res));
router.post('/cart/add', (req, res) => productController.addToCart(req, res));
router.get('/cart', (req, res) => productController.getCart(req, res));

export default router;
