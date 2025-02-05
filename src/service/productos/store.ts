import { create } from "zustand";
import { GetAllProducts, GetProduct } from "./service";
import { Product } from "./interface";

interface SubcategoriaState {
  productos: Product[];
  producto?: Product;
  errorMsg: string | undefined;
  loading: boolean;
  getAllProducts: () => void;
  getProduct: (id: string) => void;
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
  getProduct: async (id) => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetProduct(id);
    console.log("Prueba de producto: ", response.data);
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          producto: response.data
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
  clean: () =>
    set(() => ({
      errorMsg: undefined,
      loading: false,
      productos: [],
    })),
}));

export default useProductsStore;
