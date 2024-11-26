import {Response, request} from "../service";
import "../service";
import { Categoria } from "./interface";

export async function GetCategorias(): Promise<Response<Categoria[]>> {
  try {
    return await request({
      method: "GET",
      endpoint: `/api/Categories`
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}