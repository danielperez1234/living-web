import { create } from "zustand";
import { Product } from "../productos/interface";
import { CartGet, CartProduct } from "@/service/carrito/interface";
import { persist } from "zustand/middleware";
import { AddToCart, GetCart } from "./service";

interface cartState {
  getCart: (token: string) => void;
  addToCart: (product: Product, quantity: number, selectedOptions:String[], token: string | null) => void; // Añadir producto al carrito
  removeFromCart: (product: CartProduct) => void; // Eliminar producto del carrito
  updateQuantity: (product: CartProduct, quantity: number) => void; // Actualizar cantidad del producto
  clearCart: () => void; // Limpiar el carrito
}

const useCartStore = create<cartState & CartGet>()(
  persist(
    (set) => ({
      cartProducts: [],
      cartId: "",
      userId: "",
      getCart: async (token) => {
        set((state) => ({
          ...state,
        }));
        const response = await GetCart(token);
        console.log("Prueba getCart: " + response);
        if (response.status < 300 && response.data) {
          set((state) => {
            return {
              ...state,
              cartProducts: response.data!.cartProducts,
              userId: response.data!.userId,
              cartId: response.data!.cartId,
            };
          });

          return;
        }
        set((state) => {
          return {
            ...state,
          };
        });
      },
      // Agregar un producto al carrito
      addToCart: (product, quantity, selectedOptions ,token) => {
        set((state) => {
          const existingItem = state.cartProducts.find(
            (item) => item.productId === product.id
          );

          if (existingItem) {
            return {
              cartProducts: state.cartProducts.map((item) =>
                item.productId === product.id
                  ? {
                    ...item,
                    quantity: Math.min(
                      item.quantity + quantity,
                      product.maxOrder
                    )
                  }
                  : item
              )
            };
          }
          if (token != null) {
            console.log("adding")
            AddToCart({
              productId: product.id,
              quantity: Math.min(quantity, product.maxOrder),
              selectedOptions: selectedOptions
            }, token)
          }
          return {
            cartProducts: [
              ...state.cartProducts,
              {
                productId: product.id,
                productName: product.name,
                price: product.price,
                imageUrl: product.imageUrlSmall,
                quantity: Math.min(quantity, product.maxOrder),
                maxOrder: 200,
                selectedOptions:selectedOptions??[]
              }
            ]
          };
        });
      },

      // Eliminar un producto del carrito
      removeFromCart: (product) => {
        set((state) => ({
          cartProducts: state.cartProducts.filter(
            (item) => item.productId !== product.productId
          )
        }));
      },

      // Actualizar la cantidad de un producto en el carrito
      updateQuantity: (product, quantity) => {
        set((state) => ({
          cartProducts: state.cartProducts.map((item) =>
            item.productId === product.productId
              ? {
                ...item,
                quantity: Math.min(
                  Math.max(1, quantity), // Asegura que sea al menos 1
                  product.maxOrder
                )
              }
              : item
          )
        }));
      },

      // Limpiar el carrito
      clearCart: () => {
        set(() => ({ cartProducts: [] }));
      }
    }),
    {
      name: "cart-storage", // Nombre del storage
      getStorage: () => localStorage // Usar localStorage
    }
  )
);

export default useCartStore;
