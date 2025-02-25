import { Response, request } from "../service";
import '../service'
import { PurchaseHistoryElement } from "./interface";
export async function GetPurchaseHistory(token: string): Promise<Response<PurchaseHistoryElement[]>> {
  try {
      return await request({
          method: "GET",
          endpoint: `/api/Users/get-purchase-history`,
          headers: {
              "authorization": `Bearer ${token}`
          },
      });
  } catch (err) {
      return {
          status: 500,
          errors: `${err}`
      };
  }
}