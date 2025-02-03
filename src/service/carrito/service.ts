import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import "../service";
import { Cart, CartProduct, CartTotal } from "./interface";

export async function GetCart(): Promise<Response<Cart>> {
    try {
        return await request({
            method: "GET",
            endpoint: `/api/Cart/get-cart`
        });
    } catch (err) {
        return {
            status: 500,
            errors: `${err}`
        };
    }
}

export async function GetCartTotal(): Promise<Response<CartTotal>> {
    try {
        return await request({
            method: "GET",
            endpoint: `/api/Cart/get-cart-total`
        });
    } catch (err) {
        return {
            status: 500,
            errors: `${err}`
        };
    }
}

export async function AddToCart(): Promise<Response<Object>> {
    try {
        return await request({
            method: "GET",
            endpoint: `/api/Cart/add-to-cart`
        });
    } catch (err) {
        return {
            status: 500,
            errors: `${err}`
        };
    }
}

export async function RemoveFromCart(): Promise<Response<Object>> {
    try {
        return await request({
            method: "GET",
            endpoint: `/api/Cart/remove-from-cart`
        });
    } catch (err) {
        return {
            status: 500,
            errors: `${err}`
        };
    }
}