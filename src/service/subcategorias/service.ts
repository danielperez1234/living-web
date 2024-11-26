import { Response, request } from "../service";
import "../service";
import { Subcategoria } from "./interface";

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
