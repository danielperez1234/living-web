import { create } from "zustand";
import { Product } from "../productos/interface";
import { persist } from "zustand/middleware";

interface cartState {
  cartItems: { product: Product; quantity: number }[]; // Carrito con productos y cantidades
  addToCart: (product: Product, quantity: number) => void; // Añadir producto al carrito
  removeFromCart: (product: Product) => void; // Eliminar producto del carrito
  updateQuantity: (product: Product, quantity: number) => void; // Actualizar cantidad del producto
  clearCart: () => void; // Limpiar el carrito
}

const useCartStore = create<cartState>()(
  persist(
    (set) => ({
      cartItems: [],

      // Agregar un producto al carrito
      addToCart: (product, quantity) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
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

      // Eliminar un producto del carrito
      removeFromCart: (product) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.product.id !== product.id
          ),
        }));
      },

      // Actualizar la cantidad de un producto en el carrito
      updateQuantity: (product, quantity) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.product.id === product.id
              ? {
                ...item,
                quantity: Math.min(
                  Math.max(1, quantity), // Asegura que sea al menos 1
                  product.maxOrder
                ),
              }
              : item
          ),
        }));
      },

      // Limpiar el carrito
      clearCart: () => {
        set(() => ({ cartItems: [] }));
      },
    }),
    {
      name: "cart-storage", // Nombre del storage
      getStorage: () => localStorage, // Usar localStorage
    }
  )
);

export default useCartStore;
