import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/pages/register/register.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/services/auth-guard.service';
import { WalletsComponent } from './pages/wallets/wallets.component';
import { PublicGuard } from './auth/services/public-guard.service';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [PublicGuard]
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [PublicGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [PublicGuard]
  },
  {
    path: 'wallets',
    component: WalletsComponent,
    canActivate: [PublicGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
