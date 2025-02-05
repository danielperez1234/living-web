import { Response, request } from "../service";
import "../service";
import { CategoriaBase } from "./interface";

export async function GetCategorias(): Promise<Response<CategoriaBase[]>> {
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

export async function GetCategoriaById(
  idCategoria: string
): Promise<Response<CategoriaBase>> {
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
