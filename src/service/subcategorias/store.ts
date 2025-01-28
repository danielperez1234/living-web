import { create } from "zustand";
import { Subcategoria, Subcategory, SubcategoryProducts } from "./interface";
import { GetSubcategoria, GetSubcategorias } from "./service";

interface SubcategoriaState {
  subcategorias: Subcategoria;
  subcategoriaProducts: SubcategoryProducts;
  containerSubcategoriaProducts?: SubcategoryProducts;
  errorMsg: string | undefined;
  loading: boolean;
  selectedSubcategoria?: Subcategory;
  selectSubcategoria: (Subcategoria: Subcategory) => void;
  getSubcategorias: (idCategoria: string) => void;
  getSubcategoriaProducts: (id: string, page: number) => Promise<number>;
  getSubcategoryByID: (id: string, page: number) => Promise<SubcategoryProducts | undefined>;
  clean: () => void;
}

const useSubcategoriasStore = create<SubcategoriaState>()((set) => ({
  subcategorias: { id: "", categoryName: "", subcategories: [] },
  subcategoriaProducts: { elementos: 0, datosPaginados: { id: "", subcategoryName: "", subcategoryProductDtos: [] } },
  errorMsg: undefined,
  loading: false,
  selectSubcategoria: (subcategoria) => {
    set((state) => ({
      ...state,
      selectedSubcategoria: subcategoria
    }));
  },
  getSubcategorias: async (idCategoria) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetSubcategorias(idCategoria);
    console.log("Prueba subcategoria: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        console.log("Prueba subcategoria en getSubcategoria: " + response.data);

        return {
          ...state,
          loading: false,
          subcategorias: response.data
        };
      });

      return;
    }
    set((state) => {
      return {
        ...state,
        loading: false
      };
    });
  },
  getSubcategoriaProducts: async (id, page) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetSubcategoria(id, page);
    console.log("Prueba get subcategoria: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        console.log("Prueba subcategoria en getSubcategoriaProducts: " + response.data);

        return {
          ...state,
          loading: false,
          subcategoriaProducts: response.data
        };
      });
      console.log('GET SUBCATEGORIA PRODUCTS', response.data.elementos)
      const newpage = page * 2 >= response.data.elementos ? page : page + 1;
      return newpage;
    }
    set((state) => {
      return {
        ...state,
        loading: false
      };
    });
    return page;
  },
  getSubcategoryByID: async (id, page) => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetSubcategoria(id, page);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          containerSubcategoriaProducts: response.data
        }
      });
      return response.data
    }
    set((state) => {
      return {
        ...state,
        loading: false
      };
    });
    return;
  },
  clean: () =>
    set((state) => ({
      subcategorias: { id: "", categoryName: "", subcategories: [] }
    }))
}));

export default useSubcategoriasStore;
