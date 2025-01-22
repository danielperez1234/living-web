import { create } from "zustand";
import { Subcategoria, Subcategory, SubcategoryProducts } from "./interface";
import { GetSubcategoria, GetSubcategorias } from "./service";

interface SubcategoriaState {
  subcategorias: Subcategoria;
  subcategoriaProducts?: SubcategoryProducts;
  errorMsg: string | undefined;
  loading: boolean;
  selectedSubcategoria?: Subcategory;
  selectSubcategoria: (Subcategoria: Subcategory) => void;
  getSubcategorias: (idCategoria: string) => void;
  getSubcategoriaProducts: (id: string, page: number) => Promise<number>;
  clean: () => void;
}

const useSubcategoriasStore = create<SubcategoriaState>()((set) => ({
  subcategorias: { id: "", categoryName: "", subcategories: [] },
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
        return {
          ...state,
          loading: false,
          subcategoriaProducts: response.data
        };
      });
      const newpage = page * 10 >= response.data.elementos ? page : page + 1;
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
  clean: () =>
    set((state) => ({
      subcategorias: { id: "", categoryName: "", subcategories: [] }
    }))
}));

export default useSubcategoriasStore;
