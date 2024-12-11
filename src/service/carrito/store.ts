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
          // Buscar si el producto ya existe en el carrito
          const existingItem = state.cartItems.find(
            (item) => item.product.id === product.id
          );

          console.log("Cart items before add: ", state.cartItems); // Mejor ver el carrito completo

          // Si el producto ya está en el carrito
          if (existingItem) {
            console.log("Existing item found, updating quantity");
            return {
              cartItems: state.cartItems.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.quantity + quantity,
                        product.maxOrder // Limitar a la cantidad máxima permitida
                      ),
                    }
                  : item
              ),
            };
          }

          // Si el producto no está en el carrito, agregarlo
          console.log("Adding new item to cart");
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
            (item) => item.product.id !== product.id // Eliminar por ID
          ),
        }));
      },

      // Actualizar la cantidad de un producto en el carrito
      updateQuantity: (product, quantity) => {
        set((state) => {
          console.log("Updating quantity for product: ", product);

          return {
            cartItems: state.cartItems.map((item) =>
              item.product.id === product.id
                ? {
                    ...item,
                    quantity: Math.min(quantity, product.maxOrder), // Limitar la cantidad a la máxima
                  }
                : item
            ),
          };
        });
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
