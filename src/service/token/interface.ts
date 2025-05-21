export interface Token {
  userName: string;
  email:    string;
  token:    string;
  refreshToken:    string;
}
export interface UserLoginRequest {
  email: string,
  password: string
} 
export interface UserRegistroRequest {
  userName: string;
  email:    string;
  password: string;
}
