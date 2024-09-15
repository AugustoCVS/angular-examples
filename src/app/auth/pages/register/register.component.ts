import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { NavigateUtils } from '../../../utils/navigate.utils';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navigate: NavigateUtils,
  ) { }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirm_password = formGroup.get('confirm_password')?.value;
    return password === confirm_password ? null : { passwordMismatch: true };
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  submit() {
    if (this.form.valid) {
      this.loading.next(true)
      this.authService.register(this.form.getRawValue())
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

  ngOnInit(): void {
    this.initializeForm();
  }


}
