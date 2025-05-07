import "../service";
import { GetProductOptionsResponse, ProductoBase, Property } from "./interface";
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
export async function GetSubcategoryProperties(
  subcategoryId: string
): Promise<Response<Property[]>> {
  try {
    return await request<Property[]>({
      method: "GET",
      endpoint: `/subcategories/${subcategoryId}/properties`,
      headers: {
        "accept": "*/*",
      }
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`
    };
  }
}
export async function GetProductOptions(id: string): Promise<Response<GetProductOptionsResponse[]>> {
  try {
    console.log("ID: ", id);
    return await request({
      method: "GET",
      endpoint: `/api/Product/products/${id}/options`
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`
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
    //console.log("Categoria: ", category);
    //console.log('Subcategoria: ', subcategory);
    //console.log('Query: ', query);
    if (category !== undefined && subcategory !== undefined) {
      return await request({
        method: "GET",
        endpoint: `/api/Product/search-products?query=${query}&categoryId=${category}&subcategoryId=${subcategory}`
      });
    } else {
      return await request({
        method: "GET",
        endpoint: `/api/Product/search-products?query=${query}`
      });
    }
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`
    };
  }
}