import { create } from "zustand";
import {  Sucursal, SucursalPost } from "./interface";
import { GetSucursales } from "./service";

interface SucursalState {
  sucursales: Sucursal[];
  errorMsg: string | undefined;
  loading: boolean;
  getSucursales: () => void;
  clean: () => void;
}

const useSucursalesStore= create<SucursalState>()((set) => ({
  sucursales: [],
  errorMsg: undefined,
  loading: false,
  getSucursales: async () => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response = await GetSucursales();
    console.log(response)
    if (response.status < 300 && response.data) {
      set((state) => {
        return {
          ...state,
          loading: false,
          sucursales: response.data
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
  clean: () => set((state) => ({ sucursales: [] })),
  
}));
export default useSucursalesStore;