import {create} from "zustand";
import {Subcategoria, SubcategoriaElement} from "./interface";
import {GetSelectedSubcategoria, GetSubcategorias} from "./service";

interface SubcategoriaState {
    subcategorias: Subcategoria;
    selectedSubcatetgoria?:SubcategoriaElement
    errorMsg: string | undefined;
    loading: boolean;
    getSubcategorias: (idCategoria: string) => void;
    getSelectedSubcategoria: (idSubcategoria: string) => void;
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
  getSelectedSubcategoria: async (idSubcategory) => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetSelectedSubcategoria(idSubcategory);
    console.log("Prueba subcategoria seelcted: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          selectedSubcatetgoria: response.data,
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
