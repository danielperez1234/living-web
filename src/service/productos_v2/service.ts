import "../service";
import { ProductoBase } from "./interface";
import { Response, request } from "../service";

export async function GetAllProducts(): Promise<Response<ProductoBase[]>> {
  try {
    return await request({
      method: "GET",
      endpoint: `/api/Product`,
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`,
    };
  }
}

export async function GetProductById(id: string): Promise<Response<ProductoBase>> {
  try {
    console.log("ID: ", id);
    return await request({
      method: "GET",
      endpoint: `/api/Product/${id}`
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`
    };
  }
}

export async function GetProductImagesById(id: string): Promise<Response<string[]>> {
  try {
    console.log("ID: ", id);
    return await request({
      method: "GET",
      endpoint: `/api/Product/${id}/images`
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`
    };
  }
}

export async function SearchForProduct(query: string, category?: string, subcategory?: string): Promise<Response<ProductoBase[]>> {
  try {
    console.log("Categoria: ", category);
    console.log('Subcategoria: ', subcategory);
    console.log('Query: ', query);
    return await request({
      method: "GET",
      endpoint: `/api/Product/search-product?query=${query}&category=${category}&subcategory=${subcategory}`
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`
    };
  }
}