import "../service";
import { FavoriteProduct } from "./interface";
import { Response, request } from "../service";

export async function getFavoriteProducts({token}:{token:string}): Promise<Response<FavoriteProduct[]>> {
  try {
    return await request({
      method: "GET",
      endpoint: `/api/Favorite/get-favorites`,
      headers: {
        "authorization":`Bearer ${token}`
      },
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`,
    };
  }
}
export async function addProductToFavorites({token,productId}:{token:string,productId:string}): Promise<Response<FavoriteProduct[]>> {
  try {
    return await request({
      method: "POST",
      endpoint: `/api/Favorite/add-to-favorite`,
      headers: {
        "authorization":`Bearer ${token}`
      },
      body:{
        productId:productId
      }
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`,
    };
  }
}
export async function removeProductToFavorites({token,productId}:{token:string,productId:string}): Promise<Response<FavoriteProduct[]>> {
  try {
    return await request({
      method: "POST",
      endpoint: `/api/Favorite/remove-from-favorite`,
      headers: {
        "authorization":`Bearer ${token}`
      },
      body:{
        productId:productId
      }
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`,
    };
  }
}
