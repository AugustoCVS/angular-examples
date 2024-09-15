import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { ILoginRequest, ILoginResponse, IRegisterRequest } from "./interfaces/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ApiUrl = environment.api

  constructor(private httpClient: HttpClient) {
  }

  register({ name, email, password, confirm_password }: IRegisterRequest) {
    return this.httpClient.post(`${this.ApiUrl}/users/register`, {
      name,
      email,
      password,
      confirm_password
    })
  }

  login({ email, password }: ILoginRequest) {
    return this.httpClient.post<ILoginResponse>(`${this.ApiUrl}/users/login`, {
      email,
      password
    })
  }
}