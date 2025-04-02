import { create } from "zustand";
import { ProductoBase } from "./interface";
import { GetAllProducts, GetProductById, GetProductImagesById, SearchForProduct } from "./service";

interface ProductosState {
    category?: string;
    subcategory?: string;
    searchQuery?: string;
    searchedProducts?: ProductoBase[];
    allProducts: ProductoBase[];
    productos?: ProductoBase;
    errorMsg: string | undefined;
    producto: ProductoBase;
    loading: boolean;
    imagenesDelProducto: string[];
    getAllProducts: () => void;
    getProductById: (id: string) => void;
    getProductImagesById: (id: string) => void;
    searchForProduct: (query: string, category?: string, subcategory?: string) => void;
    clean: () => void;
}

const useProductosStore = create<ProductosState>()((set) => ({
    producto: {
        id: "",
        subcategoryId: "",
        name: "",
        price: 0,
        wholesalePrice: 0,
        maxOrder: 0,
        imageUrlOriginal: "",
        imageUrlSmall: ""
    },
    allProducts: [],
    errorMsg: undefined,
    loading: false,
    imagenesDelProducto: [],
    getAllProducts: async () => {
        set((state) => ({
            ...state,
            loading: true,
        }));

        const response = await GetAllProducts();

        console.log("Get al products: " + response.data);

        if (response.status < 300 && response.data) {
            console.log("Get all products: ", response.data);
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
    getProductImagesById: async (id) => {
        set((state) => ({
            ...state,
            loading: true
        }));
        const response = await GetProductImagesById(id);
        console.log("Obtener imagenes para el carousel: ", response.data);
        if (response.status < 300 && response.data) {
            set((state) => {
                return {
                    ...state,
                    loading: false,
                    imagenesDelProducto: response.data
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
    searchForProduct: async(query, Category, subcategory) => {
        set((state) => ({
            ...state,
            loading: true,
        }));
        const response = await SearchForProduct(query, Category, subcategory);
        if(response.status < 300 && response.data) {
            set((state) => {
                return {
                    ...state,
                    loading: false,
                    searchedProducts: response.data
                };
            });
            return;
        }
    },
    clean: () =>
        set(() => ({
            errorMsg: undefined,
            loading: false,
            productos: undefined,
            imagenesDelProducto: [],
        })),
}));

export default useProductosStore;