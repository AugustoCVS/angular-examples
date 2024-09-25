import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { NavigateUtils } from '../../../utils/navigate.utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private navigate: NavigateUtils,
  ) {
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl('', Validators.required)
  });

  submit() {
    if (this.form.valid) {
      this.loading.next(true)
      this.authService.register(this.form.value)
        .subscribe({
          next: () => {
            this.loading.next(false)
            this.navigate.handleNavigate({ screen: '' });
          },
          error: () => {
            this.errorMessage = 'Registration failed. Please try again.';
            this.loading.next(false)
          },
        });
      return;
    }

    return this.form.markAllAsTouched()
  }

  handleNavigateLogin() {
    this.navigate.handleNavigate({ screen: '' });
  }
}
