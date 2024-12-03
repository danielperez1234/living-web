import { Product } from "../products/interface";

export interface Subcategoria {
  id: string;
  categoryName: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  subcategoryName: string;
}
export interface SubcategoriaElement {
  id:         string;
  categoryId: string;
  name:       string;
  products:   Product[];
  properties: any[];
}


