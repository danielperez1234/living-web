export interface CartGet {
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
    maxOrder: 200;
}

export interface CartTotal {
    cartId: string;
    userId: string;
    total: number;
}
export interface ProductToCart {
    productId: string;
    quantity:  number;
}
