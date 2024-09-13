import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { IRegisterRequest } from "./interfaces/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ApiUrl = environment.api

  constructor(private httpClient: HttpClient) {
  }

  register({ name, email, password, confirmPassword }: IRegisterRequest) {
    return this.httpClient.post(`${this.ApiUrl}/register`, {
      name,
      email,
      password,
      confirmPassword
    })
  }
}