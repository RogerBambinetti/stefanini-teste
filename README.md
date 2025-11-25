# stefanini-teste

## Requisitos
Antes de começar, certifique-se de que você atendeu aos seguintes requisitos:

- Node.js (v20.x).
- Npm (v8.x) (Geralmente instalado junto com o Node.js)

## Instalação e Configuração
Instruções sobre como instalar e configurar o projeto para desenvolvimento.

1. Clone o repositório para sua máquina local:
```bash
git clone https://github.com/rogerbambinetti/stefanini-teste.git
cd stefanini-teste
```

2. Instale as dependências do projeto com npm (na raiz do repo):
```bash
npm run install:dev
```

3. Por fim, execute o projeto em modo de desenvolvimento com (isso executará os servidores backend e frontend simultaneamente com `concurrently`):
```bash
npm run start:dev
```

5. Acesse o frontend da aplicação em [http://localhost:3000](http://localhost:3000). O servidor backend é servido na porta [http://localhost:3080](http://localhost:3080)