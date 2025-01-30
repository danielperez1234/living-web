import { Response, request } from "../service";
import { Token, UserLoginRequest, UserRegistroRequest } from "./interface";
import '../service'
export default async function loginRequest(user: UserLoginRequest): Promise<Response<Token>> {
  try {
    return await request({
      method: "POST",
      endpoint: "/api/Account/login-user",
      body: user
    })
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`
    };
  }
}
export  async function registerRequest(user: UserRegistroRequest): Promise<Response<Token>> {
  try {
    return await request({
      method: "POST",
      endpoint: "/api/Account/register-user",
      body: user
    })
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`
    };
  }
}
