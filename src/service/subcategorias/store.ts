import { create } from "zustand";
import { Subcategoria, Subcategory, SubcategoryPost } from "./interface";
import { GetSubcategoria, GetSubcategorias } from "./service";

interface SubcategoriaState {
  subcategorias: Subcategoria;
    subcategoria?: SubcategoryPost;
  errorMsg: string | undefined;
  loading: boolean;
  selectedSubcategoria?: Subcategoria;
  selectSubcategoria: (Subcategoria: Subcategory) => void;
  getSubcategorias: (idCategoria: string) => void;
  getSubcategoria: (id: string) => void;
  clean: () => void;
}

const useSubcategoriasStore = create<SubcategoriaState>()((set) => ({
  subcategorias: { id: "", categoryName: "", subcategories: [] },
  errorMsg: undefined,
  loading: false,
  selectSubcategoria: () => {
    set((state) => ({
      ...state,
      selectedSubcategoria: state.subcategorias,
    }));
  },
  getSubcategorias: async (idCategoria) => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetSubcategorias(idCategoria);
    console.log("Prueba subcategoria: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          subcategorias: response.data,
        };
      });

      return;
    }
    set((state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
  getSubcategoria: async (id) => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetSubcategoria(id);
    console.log("Prueba get subcategoria: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          subcategoria: response.data,
        };
      });

      return;
    }
    set((state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
  clean: () =>
    set((state) => ({
      subcategorias: { id: "", categoryName: "", subcategories: [] },
    })),
}));

export default useSubcategoriasStore;
