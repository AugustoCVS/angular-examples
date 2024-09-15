export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  refreshToken: {
    id: string;
    userId: string;
    expiresIn: number;
  }
}