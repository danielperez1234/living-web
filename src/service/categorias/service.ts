import { Response, request } from "../service";
import "../service";
import { Categoria } from "./interface";

export async function GetCategorias(): Promise<Response<Categoria[]>> {
  try {
    return await request({
      method: "GET",
      endpoint: `/api/Categories`,
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`,
    };
  }
}

export async function GetCategoria(
  idCategoria: string
): Promise<Response<Categoria>> {
  try {
    return await request({
      method: "GET",
      endpoint: `/api/Categories/${idCategoria}`,
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`,
    };
  }
}
