import { create } from "zustand";
import { Product } from "../productos/interface";
import { CartGet, CartProduct } from "@/service/carrito/interface";
import { persist } from "zustand/middleware";
import { AddToCart, GetCart, RemoveFromCart } from "./service";
import { storageKeys } from "@/const/storage_keys";

interface cartState {
  getCart: (token: string) => void;
  addToCart: (product: Product, quantity: number, selectedOptions:String[], token: string | null) => void; // Añadir producto al carrito
  updateQuantity: (product: CartProduct,oldQuantity:number, quantity: number) => void; // Actualizar cantidad del producto
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


      // Actualizar la cantidad de un producto en el carrito
      updateQuantity: (product,oldQuantity, quantity) => {
        const differenceQty = quantity - oldQuantity;
        const token = localStorage.getItem(storageKeys.token)
        console.log('token')
        console.log(token)
        if (token != null) {
          console.log("adding")
          if(differenceQty >0){

            AddToCart({
              productId: product.productId,
              quantity: differenceQty,
              selectedOptions: []
            }, token)
          }else{
            RemoveFromCart({
              productId: product.productId,
              quantity: 0-(differenceQty),
              selectedOptions: []
            }, token)
          }
        }
        if(quantity == 0){
          set((state) => ({
            cartProducts: state.cartProducts.filter(
              (item) => item.productId !== product.productId
            )
          }));
          return
        }
        set((state) => ({
          cartProducts: state.cartProducts.map((item) =>
            item.productId === product.productId
              ? {
                ...item,
                quantity: quantity
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
