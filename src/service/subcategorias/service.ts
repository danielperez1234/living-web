import { Response, request } from "../service";
import "../service";
import { Subcategoria, SubcategoriaElement } from "./interface";

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
export async function GetSelectedSubcategoria(
  idSubcategoria: string
): Promise<Response<SubcategoriaElement>> {
  try {
    return await request({
      method: "GET",
      endpoint: `/${idSubcategoria}`,
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`,
    };
  }
}
