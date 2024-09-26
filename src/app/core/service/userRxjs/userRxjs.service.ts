import { Injectable } from "@angular/core";
import { IUserRequest, IUserResponse } from "../user/interfaces/user";
import { BehaviorSubject, Observable, take } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserRxjsService {

  private ApiUrl = environment.api

  private user$: BehaviorSubject<IUserResponse> = new BehaviorSubject<IUserResponse>({
    name: '',
    email: '',
  })

  constructor(private httpClient: HttpClient) {
  }

  getUserInfoById({ userId }: IUserRequest) {
    this.httpClient
      .get<IUserResponse>(`${this.ApiUrl}/users/${userId}`)
      .pipe(take(1))
      .subscribe((user) => this.publishedUserInfo(user))
  }

  private publishedUserInfo(user: IUserResponse): void {
    this.user$.next(user)
  }

  getUserInfo(): Observable<IUserResponse> {
    return this.user$.asObservable()
  }

}