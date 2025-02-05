import { request, Response } from "../service";
import { DeliveryData, PostDeliveryData } from "./interface";

export async function postMyDeliveryData(productPost: PostDeliveryData, token:String) {
  try {
    // const formData = new FormData();
    // Object.keys(productPost).forEach((key) => {
    //   if (productPost[key as keyof DeliveryData] != null)
    //     formData.append(key, productPost[key as keyof DeliveryData]!);
    // });
    //?Name=${productPost.name}&Price=25&WholesalePrice=20&MaxOrder=200&SubcategoryId=2f6d2a1f-f808-4e9d-3b42-08dcd84fa740
    return await request<any>({
      method: "POST",
      endpoint: `/api/Users/add-delivery-data`,
      headers: {
        "authorization":`Bearer ${token}`
      },
      body:productPost
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function putMyDeliveryData(productPost: PostDeliveryData, token:String) {
  try {
    // const formData = new FormData();
    // Object.keys(productPost).forEach((key) => {
    //   if (productPost[key as keyof DeliveryData] != null)
    //     formData.append(key, productPost[key as keyof DeliveryData]!);
    // });
    //?Name=${productPost.name}&Price=25&WholesalePrice=20&MaxOrder=200&SubcategoryId=2f6d2a1f-f808-4e9d-3b42-08dcd84fa740
    return await request<any>({
      method: "PUT",
      endpoint: `/api/Users/update-delivery-data`,
      headers: {
        "authorization":`Bearer ${token}`
      },
      body:productPost
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}
export async function getMyDeliveryData(token:String): Promise<Response<DeliveryData>> {
  try {
    // const formData = new FormData();
    // Object.keys(productPost).forEach((key) => {
    //   if (productPost[key as keyof DeliveryData] != null)
    //     formData.append(key, productPost[key as keyof DeliveryData]!);
    // });
    //?Name=${productPost.name}&Price=25&WholesalePrice=20&MaxOrder=200&SubcategoryId=2f6d2a1f-f808-4e9d-3b42-08dcd84fa740
    return await request({
      method: "GET",
      endpoint: `/api/Users/get-delivery-data`,
      headers: {
        "Content-Type": `multipart/form-data;`,
        "authorization":`Bearer ${token}`
      },
    });
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`
    };
  }
}