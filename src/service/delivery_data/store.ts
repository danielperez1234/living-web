import { create } from "zustand";
import { Product } from "../productos/interface";
import { persist } from "zustand/middleware";
import { DeliveryData, PostDeliveryData } from "./interface";
import { getMyDeliveryData } from "./service";
import { storageKeys } from "@/const/storage_keys";

interface DeliveryDataStore {
  deliveryData: DeliveryData | undefined;
  getDeliveryData: () => void;
  loading: boolean;
  clearDeliveryData: () => void; // Limpiar el carrito
}

const useDeliveryDataStore = create<DeliveryDataStore>()(
  persist(
    (set) => ({
      deliveryData:undefined,
      loading:false,
      getDeliveryData:async () => {
        set((state) => ({
          ...state,
          loading: true,
        }));
        const response = await getMyDeliveryData(localStorage.getItem(storageKeys.token) ?? '');
        console.log("Prueba subcategoria: " + response);
        if (response.status < 300 && response.data) {
          set((state) => {
            return {
              ...state,
              loading: false,
              deliveryData: response.data,
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
      // Limpiar el carrito
      clearDeliveryData: () => {
        set(() => ({ deliveryData: undefined}));
      },
    }),
    {
      name: "delivery-data", // Nombre del storage
      getStorage: () => localStorage, // Usar localStorage
    }
  )
);

export default useDeliveryDataStore;
