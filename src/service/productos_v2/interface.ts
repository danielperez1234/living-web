export interface ProductoBase {
    id: string;
    subcategoryId: string;
    name: string;
    price: number;
    wholesalePrice: number;
    maxOrder: number;
    imageUrlOriginal: string;
    imageUrlSmall: string;
    productOptions?: any[];
}