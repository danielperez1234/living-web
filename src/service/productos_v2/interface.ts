export interface ProductoBase {
    id: string;
    description: string;
    subcategoryId: string;
    name: string;
    price: number;
    wholesalePrice: number;
    maxOrder: number;
    imageUrlOriginal: string;
    imageUrlSmall: string;
    productOptions?: any[];
}
export interface GetProductOptionsResponse {
    id:               string;
    productId:        string;
    propertyOptionId: string;
  }
  export interface Property {
    id:            string;
    subcategoryId: string;
    name:          string;
    isDeleted:     boolean;
    options:       PropertyOption[];
  }
  export interface PropertyOption {
    id:                 string;
    categoryPropertyId: string;
    text:               string;
    image?:             string;
    isDeleted:          boolean;
  }