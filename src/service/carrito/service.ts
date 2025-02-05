import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import "../service";
import { CartGet, CartProduct, CartTotal, ProductToCart } from "./interface";

export async function GetCart(token:string): Promise<Response<CartGet>> {
    try {
        return await request({
            method: "GET",
            endpoint: `/api/Cart/get-cart`,
            headers: {
              "authorization":`Bearer ${token}`
            },
        });
    } catch (err) {
        return {
            status: 500,
            errors: `${err}`
        };
    }
}

export async function GetCartTotal(token:string): Promise<Response<CartTotal>> {
    try {
        return await request({
            method: "GET",
            endpoint: `/api/Cart/get-cart-total`,
            headers: {
              "authorization":`Bearer ${token}`
            },
        });
    } catch (err) {
        return {
            status: 500,
            errors: `${err}`
        };
    }
}

export async function AddToCart(product: ProductToCart,token:string): Promise<Response<Object>> {
    try {
        return await request({
            method: "POST",
            endpoint: `/api/Cart/add-to-cart`,
            headers: {
              "authorization":`Bearer ${token}`
            },
            body:product
        });
    } catch (err) {
        return {
            status: 500,
            errors: `${err}`
        };
    }
}

export async function RemoveFromCart(product: ProductToCart,token:string): Promise<Response<Object>> {
    try {
        return await request({
            method: "GET",
            endpoint: `/api/Cart/remove-from-cart`,
            headers: {
              "authorization":`Bearer ${token}`
            },
            body:product
        });
    } catch (err) {
        return {
            status: 500,
            errors: `${err}`
        };
    }
}