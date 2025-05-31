export interface CartGet {
    userId: String;
    cartId: String;
    cartProducts: CartProduct[];
}

export interface CartProduct {
    productId: String;
    productName: String;
    quantity: number;
    price: number;
    imageUrl: String;
    maxOrder: number;
    selectedOptions: SelectedOption[];
}

export interface SelectedOption {
    id:    String;
    text?:  String | "";
    image?: String | undefined;
}
export interface CartTotal {
    cartId: String;
    userId: String;
    total: number;
}
export interface ProductToCart {
    productId: String;
    quantity:  number;
    selectedOptions:String[]
}
