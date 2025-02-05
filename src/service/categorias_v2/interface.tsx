import { SubcategoriaConProductos } from "../subcategorias-v2/interface";

export interface CategoriaBase {
  id: string;
  categoryName: string;
  subcategories: SubcategoriaConProductos[];
}