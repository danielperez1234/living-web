import { Product } from "../productos/interface";

export interface Subcategoria {
  id: string;
  categoryName: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  subcategoryName: string;
}

// 12/02/2024
export interface SubcategoryPost {
  id: string;
  categoryId: string;
  category: object;
  name: string;
  products: Product[];
}
