import { ProductoBase } from "../productos_v2/interface";

// Subcategorias
export interface SubcategoriaBase {
    id: string;
    categoryId: string;
    name: string;
    products: any[];
    properties: any[];
}

// Subcategoria con productos
export interface SubcategoriaConProductos {
    id: string;
    subcategoryName: string;
    products: ProductoBase[];
}

// Subcategorias paginadas
export interface SubcategoriaPaginada {
    elementos: number;
    datosPaginados: DatosPaginados;
}

export interface DatosPaginados {
    id: string;
    subcategoryName: string;
    subcategoryProductDtos: ProductoBase[];
}