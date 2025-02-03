export interface Cart {
    userId: string;
    cartId: string;
    cartProducts: CartProduct[];
}

export interface CartProduct {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    imageUrl: string;
}

export interface CartTotal {
    cartId: string;
    userId: string;
    total: number;
}