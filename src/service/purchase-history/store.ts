import { create } from "zustand";
import { Product } from "../productos/interface";
import { persist } from "zustand/middleware";
import { PurchaseHistoryElement } from "./interface";
import { GetPurchaseHistory } from "./service";
import { storageKeys } from "@/const/storage_keys";

interface PurchaseHistoryStore {
  purchaseHistory: PurchaseHistoryElement[] | undefined;
  purchaseSelected: PurchaseHistoryElement | undefined;
  getPurchaseHistory: () => void;
  selectPurchase: (purchase:PurchaseHistoryElement) => void;
  loading: boolean;
  clearDeliveryData: () => void; // Limpiar el carrito
}

const usePurchaseHistory = create<PurchaseHistoryStore>()(
  persist(
    (set) => ({
      purchaseHistory:undefined,
      purchaseSelected:undefined,
      loading:false,
      selectPurchase:(p)=>{
        set((state)=>({
          ...state,
          purchaseSelected:p
        }))
      },
      getPurchaseHistory:async () => {
        set((state) => ({
          ...state,
          loading: true,
        }));
        const response = await GetPurchaseHistory(localStorage.getItem(storageKeys.token) ?? '');
        if (response.status < 300 && response.data) {
          set((state) => {
            return {
              ...state,
              loading: false,
              purchaseHistory: response.data,
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
        set(() => ({ purchaseHistory: undefined}));
      },
    }),
    {
      name: "purchase-history", // Nombre del storage
      getStorage: () => localStorage, // Usar localStorage
    }
  )
);

export default usePurchaseHistory;
