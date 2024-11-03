import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../core/service/auth/auth.service';
import { NavigateUtils } from '../../../utils/navigate.utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TokenUtils } from '../../utils/token.utils';
import { ILoginRequest } from '../../../core/service/auth/interfaces/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilderService: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  protected errorMessage: string = '';
  protected loading$ = this.loading.asObservable();

  protected form = this.formBuilderService.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private authService: AuthService,
    private navigate: NavigateUtils,
    private token: TokenUtils,
  ) { }

  submit() {
    const formValues = this.form.value;
    if (this.form.valid) {
      this.loading.next(true);
      this.authService.login(formValues as ILoginRequest)
        .subscribe({
          next: (res) => {
            this.loading.next(false);
            this.token.handleSaveTokenOnStorage({
              token: res.token,
              refreshToken: res.refreshToken.id
            });
            this.form.reset();
            this.navigate.handleNavigate({ screen: 'home' });
          },
          error: () => {
            this.errorMessage = 'Login failed. Please try again.';
            // this.loading.next(false);
            // this.navigate.handleNavigate({ screen: 'home' });
          }
        });

      return;
    }

    this.form.markAllAsTouched();
  }

  handleNavigateRegister() {
    this.navigate.handleNavigate({ screen: 'register' });
  }

}
