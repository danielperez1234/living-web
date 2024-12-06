import { create } from "zustand";
import { GetAllProducts } from "./service";
import { Product } from "./interface";

interface SubcategoriaState {
  productos: Product[];
  errorMsg: string | undefined;
  loading: boolean;
  getAllProducts: () => void;
  setProducts: (x: Product[]) => void;
  clean: () => void;
}

const useProductsStore = create<SubcategoriaState>()((set) => ({
  productos: [],
  errorMsg: undefined,
  loading: false,
  getAllProducts: async () => {
    set((state) => ({
      ...state,
      loading: true,
    }));
    const response = await GetAllProducts();
    console.log("Prueba subcategoria: " + response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          productos: response.data,
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
  setProducts: (prods) => {
    set((state) => {
      return {
        ...state,
        loading: false,
        productos: prods,
      };
    });
  },
  clean: () =>
    set(() => ({
      errorMsg: undefined,
      loading: false,
      productos: [],
    })),
}));

export default useProductsStore;
