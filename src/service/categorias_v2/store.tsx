import { create } from "zustand";
import { CategoriaBase } from "./interface";
import { GetCategorias, GetCategoriaById } from "./service";

interface CategoriaState {
  // Default
  errorMsg: string | undefined;
  loading: boolean;
  // Contenedores
  categroias?: CategoriaBase[];
  categoriaSeleccionada?: CategoriaBase;
  // Funciones
  selectCategoria: (categoria: CategoriaBase) => void;
  getCategorias: () => void;
  getCategoriaById: (idCategoria: string) => void;
  clean: () => void;
}

const useCategoriasStore = create<CategoriaState>()((set) => ({
  errorMsg: undefined,
  loading: false,
  selectCategoria: (categoria) => {
    set((state) => ({
      ...state,
      selectedCategoria: categoria,
    }));
  },
  getCategorias: async () => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetCategorias();
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          categroias: response.data,
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
  getCategoriaById: async (idCategoria: string) => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetCategoriaById(idCategoria);
    if (response.status < 300 && response.data) {
      set((state) => {
        console.log("GetCategoriaById: " + response.data);
        return {
          ...state,
          loading: false,
          categoriaSeleccionada: response.data,
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
      categorias: undefined,
      categoriaSeleccionada: undefined,
    })),
}));

export default useCategoriasStore;
