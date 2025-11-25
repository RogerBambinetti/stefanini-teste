export class ProductNotFoundError extends Error {
    constructor(id: number) {
        super(`Produto com ID ${id} não encontrado`);
        this.name = 'ProductNotFoundError';
    }
}

export class InvalidProductDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidProductDataError';
    }
}

export class InvalidCartOperationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidCartOperationError';
    }
}
