import { create } from "zustand";
import { Product } from "../productos/interface";

interface cartState {
  cartItems: { product: Product; quantity: number }[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (product: Product) => void;
  updateQuantity: (product: Product, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<cartState>()((set) => ({
  cartItems: [],

  addToCart: (product, quantity) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => (item.product.id = product.id)
      );

      if (existingItem) {
        console.log("Add", state.cartItems);
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + quantity,
                    product.maxOrder
                  ),
                }
              : item
          ),
        };
      }
      return {
        cartItems: [
          ...state.cartItems,
          { product, quantity: Math.min(quantity, product.maxOrder) },
        ],
      };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => item.product.id !== productId.id
      ),
    }));
  },

  updateQuantity: (productId, quantity) => {
    set((state) => {
      console.log("Update", state.cartItems);
      return {
        cartItems: state.cartItems.map((item) =>
          item.product.id === productId.id
            ? { ...item, quantity: Math.min(quantity, item.product.maxOrder) }
            : item
        ),
      };
    });
  },

  clearCart: () => {
    set(() => ({ cartItems: [] }));
  },
}));
export default useCartStore;
