# API de Produtos com Carrinho

API REST desenvolvida com Express e TypeScript para gerenciar produtos e carrinho de compras com dados mockados.

## 🚀 Como executar

### Instalação
```bash
npm install
```

### Desenvolvimento (com hot-reload)
```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:3000`

### Build para produção
```bash
npm run build
npm start
```

## 📋 Endpoints

### 1. GET /api/products/:id
Retorna os dados detalhados de um produto específico.

**Exemplo de requisição:**
```bash
curl http://localhost:3000/api/products/1
```

**Resposta (200):**
```json
{
  "id": 1,
  "nome": "Notebook Dell Inspiron 15",
  "preco": 3500.00,
  "descricao": "Notebook com processador Intel Core i7, 16GB de RAM e 512GB SSD. Tela de 15.6 polegadas Full HD.",
  "foto": "https://images.unsplash.com/photo-1588405748030-b37e3c43439d?w=500&h=500&fit=crop"
}
```

**Resposta de erro (404):**
```json
{
  "error": "Produto não encontrado",
  "id": 999
}
```

---

### 2. POST /api/cart/add
Adiciona um produto ao carrinho. Se o produto já existe no carrinho, aumenta a quantidade.

**Exemplo de requisição:**
```bash
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantidade": 2}'
```

**Body da requisição:**
```json
{
  "productId": 1,
  "quantidade": 2
}
```

**Resposta (201):**
```json
{
  "message": "Produto adicionado ao carrinho com sucesso",
  "cart": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "nome": "Notebook Dell Inspiron 15",
        "preco": 3500.00,
        "descricao": "Notebook com processador Intel Core i7, 16GB de RAM e 512GB SSD. Tela de 15.6 polegadas Full HD.",
        "foto": "https://images.unsplash.com/photo-1588405748030-b37e3c43439d?w=500&h=500&fit=crop"
      },
      "quantidade": 2
    }
  ]
}
```

---

### 3. GET /api/cart
Retorna todos os itens do carrinho com o total.

**Exemplo de requisição:**
```bash
curl http://localhost:3000/api/cart
```

**Resposta (200):**
```json
{
  "items": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "nome": "Notebook Dell Inspiron 15",
        "preco": 3500.00,
        "descricao": "Notebook com processador Intel Core i7, 16GB de RAM e 512GB SSD. Tela de 15.6 polegadas Full HD.",
        "foto": "https://images.unsplash.com/photo-1588405748030-b37e3c43439d?w=500&h=500&fit=crop"
      },
      "quantidade": 2
    }
  ],
  "itemCount": 1,
  "total": 7000.00
}
```

---

## 📦 Produtos Disponíveis

| ID | Nome | Preço | Descrição |
|---|---|---|---|
| 1 | Notebook Dell Inspiron 15 | R$ 3.500,00 | Notebook com processador Intel Core i7, 16GB de RAM e 512GB SSD |
| 2 | Mouse Logitech MX Master 3 | R$ 299,90 | Mouse sem fio ergonômico com múltiplos botões programáveis |
| 3 | Teclado Mecânico RGB | R$ 450,00 | Teclado mecânico com switches RGB customizáveis |
| 4 | Monitor LG 27" 4K | R$ 1.800,00 | Monitor UltraFine 4K com reprodução de cores precisa |
| 5 | Webcam Logitech C922 | R$ 199,90 | Webcam Full HD com autofoco automático e microfone |
| 6 | Headset Gamer SteelSeries Arctis 7 | R$ 599,90 | Headset wireless com som surround 7.1 |

---

## 🛠️ Estrutura do Projeto

```
backend/
├── index.ts           # Servidor principal com todos os endpoints
├── types.ts           # Interfaces TypeScript
├── mockData.ts        # Dados mockados de produtos
├── package.json       # Dependências do projeto
├── tsconfig.json      # Configuração do TypeScript
└── README.md          # Este arquivo
```

## 📝 Estrutura de Dados

### Product
```typescript
interface Product {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  foto: string;
}
```

### CartItem
```typescript
interface CartItem {
  id: number;
  product: Product;
  quantidade: number;
}
```

## ✨ Recursos Adicionais

- **GET /api/products** - Lista todos os produtos disponíveis
- **GET /health** - Health check da API

## 🔧 Dependências

- **express** - Framework web
- **typescript** - Tipagem estática
- **ts-node** - Execução de TypeScript
- **@types/express** - Tipos para Express
- **@types/node** - Tipos para Node.js
