import { Response, request } from "../service";
import '../service'
import { Banner } from "./interface";

export  async function GetBannersLocation(location:string):Promise<Response<Banner[]>>{
  try{
  return await request({
    method:"GET",
    endpoint:`/api/Assets/location/${location}`,
    
  })
}catch(err){
  return  {
    status: 500,
    errors: `${err}`
  };;
}}