import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { UserRxjsService } from "../../core/service/userRxjs/userRxjs.service";
import { Observable } from "rxjs";
import { IUserResponse } from "../../core/service/user/interfaces/user";
import { TokenUtils } from "../../auth/utils/token.utils";
import { NavigateUtils } from "../../utils/navigate.utils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  // store = inject(Store)
  // user$: Observable<IUserResponse> = this.store.select(userSelector)
  private userRxjsService = inject(UserRxjsService)
  protected userInfo$: Observable<IUserResponse> = this.userRxjsService.getUserInfo()
  private userId: string = '';

  constructor(
    private tokenUtils: TokenUtils,
    private navigate: NavigateUtils,
  ) {
    this.userId = this.tokenUtils.handleDecodeToken()?.sub || ''
  }

  ngOnInit(): void {
    this.userRxjsService.getUserInfoById({ userId: this.userId })
  }

  handleNavigate() {
    this.navigate.handleNavigate({ screen: 'wallets' })
  }

}

