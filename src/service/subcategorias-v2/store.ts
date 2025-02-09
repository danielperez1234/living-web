import { create } from "zustand";
import { SubcategoriaBase, SubcategoriaConProductos, SubcategoriaPaginada } from "./interface";
import { GetSubcategoriasBase, GetSubcategoriasConProductos, GetSubcategoriasPaginadas } from "./service";

interface SubcategoriaState {
    // Default
    errorMsg: string | undefined;
    loading: boolean;
    // Contenedores
    subcategoriasBase?: SubcategoriaBase[];
    subcategoriasConProductos?: SubcategoriaConProductos[];
    subcategoriaPaginada?: SubcategoriaPaginada;
    subcategoriaBaseSeleccionada?: SubcategoriaConProductos;
    // Funciones
    getSubcategoriasBase: () => void;
    getSubcategoriasConProductos: () => void;
    getSubcategoriasPaginadas: (id: string, page: number) => void;
    clean: () => void;
}

const useSubcategoriasStore = create<SubcategoriaState>()((set) => ({
    // Default
    errorMsg: undefined,
    loading: false,
    // Contenedores
    getSubcategoriasBase: async () => {
        set((state) => ({
            ...state,
            loading: true
        }));
        const response = await GetSubcategoriasBase();
        console.log("Get subcategorias base: " + response.data);
        if (response.status < 300 && response.data) {
            set((state) => {
                return {
                    ...state,
                    loading: false,
                    subcategoriasBase: response.data
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
    getSubcategoriasConProductos: async () => {
        set((state) => ({
            ...state,
            loading: true
        }));
        const response = await GetSubcategoriasConProductos();
        console.log("Get subcategorias base: " + response.data);
        if (response.status < 300 && response.data) {
            set((state) => {
                return {
                    ...state,
                    loading: false,
                    subcategoriasConProductos: response.data
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
    getSubcategoriasPaginadas: async (id, page) => {
        set((state) => ({
            ...state,
            loading: true
        }));
        const response = await GetSubcategoriasPaginadas(id, page);
        console.log("Get subcategorias paginada: " + response.data);
        if (response.status < 300 && response.data) {
            set((state) => {
                return {
                    ...state,
                    loading: false,
                    subcategoriaPaginada: response.data
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
        set((state) => ({
            subcategoriasBase: [],
            subcategoriasConProductos: [],
            subcategoriaPaginada: undefined,
            subcategoriaBaseSeleccionada: undefined
        }
        ))
}));

export default useSubcategoriasStore;