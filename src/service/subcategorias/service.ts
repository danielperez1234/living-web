import { Response, request } from "../service";
import "../service";
import { Subcategoria, SubcategoryPost } from "./interface";

export async function GetSubcategorias(
  idCategoria: string
): Promise<Response<Subcategoria>> {
  try {
    return await request({
      method: "GET",
      endpoint: `/api/Categories/${idCategoria}`,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}

export async function GetSubcategoria(
  id: string
): Promise<Response<SubcategoryPost>> {
  try {
    console.log("ID de la subcategoria: " + id);
    return await request({
      method: "GET",
      endpoint: `/${id}`,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}
