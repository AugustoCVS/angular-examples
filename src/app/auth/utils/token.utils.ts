import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenUtils {
  token: string = '';
  refreshToken: string = '';

  handleSaveTokenOnStorage({ token, refreshToken }: { token: string; refreshToken: string }) {
    this.token = token;
    this.refreshToken = refreshToken;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  handleGetTokenFromStorage() {
    this.token = localStorage.getItem('token') || '';
    this.refreshToken = localStorage.getItem('refreshToken') || '';
  }

  handleRemoveTokenFromStorage() {
    this.token = '';
    this.refreshToken = '';
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}
