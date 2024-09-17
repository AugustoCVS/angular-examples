import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { userSelector } from "../../store/user/user.selector";
import { IUserResponse } from "../../core/service/user/interfaces/user";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent {
  store = inject(Store)
  user$: Observable<IUserResponse> = this.store.select(userSelector)
}

