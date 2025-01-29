import { request } from "../service";
import { DeliveryData } from "./interface";

export async function postMyDeliveryData(productPost: DeliveryData, token:String) {
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
        "Content-Type": `multipart/form-data;`,
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