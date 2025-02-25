import {  request, Response } from "../service";
import "../service";
import { PostPayment, ResponsePayment } from "./interface";
export async function PostOpenPayment(product: PostPayment, token: string): Promise<Response<ResponsePayment>> {
  try {
      return await request({
          method: "POST",
          endpoint: `/api/OpenPay/proccess`,
          headers: {
              "authorization": `Bearer ${token}`
          },
          body: product
      });
  } catch (err) {
      return {
          status: 500,
          errors: `${err}`
      };
  }
}