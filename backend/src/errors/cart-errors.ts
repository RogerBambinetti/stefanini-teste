export class InvalidCartOperationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidCartOperationError';
    }
}

export class CartItemNotFoundError extends Error {
    constructor(cartItemId: number) {
        super(`Cart item with ID ${cartItemId} not found`);
        this.name = 'CartItemNotFoundError';
    }
}
