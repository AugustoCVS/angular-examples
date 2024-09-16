import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { IUserRequest, IUserResponse } from "./interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ApiUrl = environment.api

  constructor(private httpClient: HttpClient) {
  }

  getUserInfoById({ userId }: IUserRequest) {
    return this.httpClient.get<IUserResponse>(`${this.ApiUrl}/users/${userId}`);
  }

}