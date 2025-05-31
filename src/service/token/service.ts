import { Response, request } from "../service";
import { ForgotPasswordRequest, ResetPasswordRequest, Token, UserLoginRequest, UserRegistroRequest } from "./interface";
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
export  async function forgotPassword(user: ForgotPasswordRequest): Promise<Response<string>> {
  try {
    return await request({
      method: "POST",
      endpoint: "/api/Account/forgot-password",
      body: user
    })
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`
    };
  }
}
export  async function resetPassword(user: ResetPasswordRequest): Promise<Response<string>> {
  try {
    return await request({
      method: "POST",
      endpoint: "/api/Account/reset-password",
      body: user
    })
  } catch (err) {
    return {
      status: 500,
      errors: `${err}`
    };
  }
}
