import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import "../service";
import { Subcategoria, SubcategoryProducts } from "./interface";

export async function GetSubcategorias(
  idCategoria: string
): Promise<Response<Subcategoria>> {
  try {
    var token = localStorage.getItem(storageKeys.token);
    return await request({
      method: "GET",
      endpoint: `/api/Categories/${idCategoria}`,
      headers: {
        authorization: `bearer ${token}`,
      },
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`,
    };
  }
}

export async function GetSubcategoria(
  id: string, page: number
): Promise<Response<SubcategoryProducts>> {
  try {
    console.log("ID de la subcategoria: ", id);
    return await request({
      method: "GET",
      endpoint: `/${id}?pageNumber=${page}&pageSize=10`,
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`,
    };
  }
}