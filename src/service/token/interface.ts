export interface Token {
  userName: string;
  email:    string;
  token:    string;
  refreshToken:    string;
}
export interface UserLoginRequest {
  email: string,
  password: string
  recaptchaToken:string
} 
export interface UserRegistroRequest {
  userName: string;
  email:    string;
  password: string;
}
export interface ResetPasswordRequest {
  email: string;
  token:    string;
  newPassword: string;
}
export interface ForgotPasswordRequest {
  email:    string;
  recaptchaToken:string
}
