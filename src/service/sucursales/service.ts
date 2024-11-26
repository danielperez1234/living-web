import { Response, request } from "../service";
import "../service";
import { Sucursal } from "./interface";
export async function GetSucursales(): Promise<Response<Sucursal[]>> {
  try {
    return await request({
      method: "GET",
      endpoint: `/api/Branches`
    });
  } catch (err) {
    return {
      status: 500,
      error: `${err}`
    };
  }
}

// const formData = new FormData();
//     Object.keys(banner).forEach(key => {if(banner[key as keyof BannerPost] != null)formData.append(key, banner[key as keyof BannerPost]! )})
//     console.log(banner.AssetFile?.size)
//   return await request<Banner>({
//     method:"POST",
//     endpoint:`/api/Assets/upload-asset`,
//     headers:{
//       "Content-Type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,},
//     formData: formData
