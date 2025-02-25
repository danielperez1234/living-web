import { create } from "zustand";
import { FavoriteProduct } from "./interface";
import { addProductToFavorites, getFavoriteProducts, removeProductToFavorites } from "./service";
import { storageKeys } from "@/const/storage_keys";
import { Product } from "../productos/interface";

interface ProductosState {
    favoriteProducts: FavoriteProduct[];
    errorMsg: string | undefined;
    loading: boolean;
    getfavoriteProducts: () => Promise<void>;
    addProductToFavorites: (product: Product | FavoriteProduct) => Promise<void>;
    removeProductToFavorites: (id: string) => Promise<void>;
    clean: () => void;
}

const useFavoriteProductosStore = create<ProductosState>((set, get) => ({
    favoriteProducts: [],
    errorMsg: undefined,
    loading: false,
    addProductToFavorites: async (product) => {
        set({ errorMsg: undefined });
    
        try {
            // Obtener el token del localStorage
            const token = localStorage.getItem(storageKeys.token) || '';
    
            // Hacer la solicitud para agregar el producto a favoritos
            const response = await addProductToFavorites({ token, productId: product.id });
    
            if (response.status < 300 && response.data) {
                set((state) => ({
                    ...state,
                    favoriteProducts: [
                        ...state.favoriteProducts,
                        {
                            id: product.id,
                            imageUrlOriginal: product.imageUrlOriginal,
                            name: product.name,
                            price: product.price,
                        },
                    ],
                    errorMsg: undefined, // Limpiar el mensaje de error
                }));
            } else {
                // Si la respuesta no tiene datos, mostrar un mensaje de error
                set({
                    errorMsg: "No se pudo agregar el producto a favoritos.", // Mensaje de error
                });
            }
        } catch (error) {
            console.error("Error adding product to favorites:", error);
    
            // En caso de error, mostrar un mensaje de error
            set({
                errorMsg: "Hubo un error al agregar el producto a favoritos.", // Mensaje de error
            });
        }
    },
    
    removeProductToFavorites: async (productId) => {
        set({ errorMsg: undefined });
    
        try {
            // Obtener el token del localStorage
            const token = localStorage.getItem(storageKeys.token) || '';
    
            // Hacer la solicitud para eliminar el producto de favoritos
            const response = await removeProductToFavorites({ token, productId });
    
            if (response.status < 300 && response.data) {
                set((state) => ({
                    ...state,
                    favoriteProducts: state.favoriteProducts.filter((product) => product.id !== productId),
                    errorMsg: undefined, // Limpiar el mensaje de error
                }));
            } else {
                // Si la respuesta no tiene datos, mostrar un mensaje de error
                set({
                    errorMsg: "No se pudo eliminar el producto de favoritos.", // Mensaje de error
                });
            }
        } catch (error) {
            console.error("Error removing product from favorites:", error);
    
            // En caso de error, mostrar un mensaje de error
            set({
                errorMsg: "Hubo un error al eliminar el producto de favoritos.", // Mensaje de error
            });
        }
    },
    getfavoriteProducts: async () => {
        // Si ya está cargando, no hacer nada
        if (get().loading) return;

        // Activar el estado de carga y limpiar mensajes de error
        set({ loading: true, errorMsg: undefined });

        try {
            // Obtener el token del localStorage
            const token = localStorage.getItem(storageKeys.token) || '';

            // Hacer la solicitud para obtener los productos favoritos
            const response = await getFavoriteProducts({ token });

            console.log("Get all products: ", response.data);

            // Verificar si la respuesta es exitosa y tiene datos
            if (response.status < 300 && response.data) {
                set({
                    loading: false,
                    favoriteProducts: response.data, // Actualizar los productos favoritos
                    errorMsg: undefined, // Limpiar el mensaje de error
                });
            } else {
                // Si la respuesta no tiene datos, limpiar los productos favoritos
                set({
                    loading: false,
                    favoriteProducts: [], // Limpiar la lista de productos favoritos
                    errorMsg: "No se pudieron cargar los productos favoritos.", // Mensaje de error
                });
            }
        } catch (error) {
            console.error("Error fetching favorite products:", error);

            // En caso de error, desactivar el estado de carga y mostrar un mensaje de error
            set({
                loading: false,
                errorMsg: "Hubo un error al cargar los productos favoritos.", // Mensaje de error
            });
        }
    },

    clean: () =>
        set({
            favoriteProducts: [], // Limpiar la lista de productos favoritos
            errorMsg: undefined, // Limpiar el mensaje de error
            loading: false, // Desactivar el estado de carga
        }),
}));

export default useFavoriteProductosStore;