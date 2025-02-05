import { create } from "zustand";
import { ProductoBase } from "./interface";
import { GetAllProducts, GetProductById } from "./service";

interface ProductosState {
    allProducts: ProductoBase[];
    productos?: ProductoBase;
    errorMsg: string | undefined;
    loading: boolean;
    getAllProducts: () => void;
    getProductById: (id: string) => void;
    clean: () => void;
}

const useProductosStore = create<ProductosState>()((set) => ({
    allProducts: [],
    errorMsg: undefined,
    loading: false,
    getAllProducts: async () => {
        set((state) => ({
            ...state,
            loading: true,
        }));

        const response = await GetAllProducts();

        console.log("Get al products: " + response.data);

        if (response.status < 300 && response.data) {
            set((state) => {
                return {
                    ...state,
                    loading: false,
                    allProducts: response.data,
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
    getProductById: async (id) => {
        set((state) => ({
            ...state,
            loading: true
        }));
        const response = await GetProductById(id);
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
            productos: undefined,
        })),
}));

export default useProductosStore;