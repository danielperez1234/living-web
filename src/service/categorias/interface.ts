import { SubcategoriaConProductos } from "../subcategorias-v2/interface";

export interface Categoria {
  id: string;
  categoryName: string;
  subcategories: SubcategoriaConProductos[];
}

// export interface Subcategoria {
//   id: string;
//   categoryId: string;
//   name: string;
// }
