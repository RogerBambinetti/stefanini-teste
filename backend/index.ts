import express, { Request, Response } from 'express';
import { Product, CartItem } from './types';
import { products } from './mockData';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let cart: CartItem[] = [];

app.get('/api/products/:id', (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id);

        const product = products.find(p => p.id === productId);

        if (!product) {
            return res.status(404).json({
                error: 'Produto não encontrado',
                id: productId
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao buscar produto'
        });
    }
});

app.post('/api/cart/add', (req: Request, res: Response) => {
    try {
        const { productId, quantidade } = req.body;

        if (!productId || !quantidade) {
            return res.status(400).json({
                error: 'productId e quantidade são obrigatórios'
            });
        }

        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return res.status(400).json({
                error: 'quantidade deve ser um número maior que 0'
            });
        }

        const product = products.find(p => p.id === productId);

        if (!product) {
            return res.status(404).json({
                error: 'Produto não encontrado',
                productId
            });
        }

        const existingItem = cart.find(item => item.product.id === productId);

        if (existingItem) {
            existingItem.quantidade += quantidade;
        } else {
            const newCartItem: CartItem = {
                id: cart.length + 1,
                product,
                quantidade
            };
            cart.push(newCartItem);
        }

        res.status(201).json({
            message: 'Produto adicionado ao carrinho com sucesso',
            cart
        });
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao adicionar produto ao carrinho'
        });
    }
});

app.get('/api/cart', (req: Request, res: Response) => {
    try {
        const total = cart.reduce((sum, item) => {
            return sum + (item.product.preco * item.quantidade);
        }, 0);

        res.status(200).json({
            items: cart,
            itemCount: cart.length,
            total: parseFloat(total.toFixed(2))
        });
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao buscar carrinho'
        });
    }
});

app.get('/api/products', (req: Request, res: Response) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao buscar produtos'
        });
    }
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
