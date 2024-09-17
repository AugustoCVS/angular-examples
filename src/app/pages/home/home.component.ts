import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { userState } from "../../store/user/user.reducer";
import { userSelector } from "../../store/user/user.selector";
import { userActions } from "../../store/user/user.actions";
import { TokenUtils } from "../../auth/utils/token.utils";
import { IUserResponse } from "../../core/service/user/interfaces/user";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {

  store = inject(Store)
  sub: string = '';

  constructor(
    private tokenUtils: TokenUtils
  ) {
    this.sub = this.tokenUtils.handleDecodeToken().sub || ''
  }

  user$: Observable<IUserResponse> = this.store.select(userSelector)

  ngOnInit(): void {
    this.store.dispatch(userActions.loadUserInfo({ userId: this.sub }))
  }

}

