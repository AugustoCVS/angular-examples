import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../core/service/auth/auth.service';
import { NavigateUtils } from '../../../utils/navigate.utils';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();
  errorMessage: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navigate: NavigateUtils,
  ) { }

  initializeForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  submit() {
    if (this.form.valid) {
      this.loading.next(true);
      this.authService.login(this.form.getRawValue())
        .subscribe({
          next: () => {
            this.loading.next(false);
          },
          error: () => {
            this.errorMessage = 'Login failed. Please try again.';
            this.loading.next(false);
          }
        });
      return;
    }

    return this.form.markAllAsTouched();
  }

  handleNavigateRegister() {
    this.navigate.handleNavigate({ screen: 'register' });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

}
