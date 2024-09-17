import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TokenUtils } from './auth/utils/token.utils';
import { userActions } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  store = inject(Store)
  sub: string = '';

  constructor(
    private tokenUtils: TokenUtils
  ) {
    this.sub = this.tokenUtils.handleDecodeToken()?.sub || ''
  }

  ngOnInit(): void {
    if (this.sub) {
      this.store.dispatch(userActions.loadUserInfo({ userId: this.sub }))
    }
  }

}
