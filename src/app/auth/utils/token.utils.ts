import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenUtils {

  handleSaveTokenOnStorage({ token, refreshToken }: { token: string; refreshToken: string }) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  handleGetTokenFromStorage() {
    return {
      token: localStorage.getItem('token') || '',
      refreshToken: localStorage.getItem('refreshToken') || ''
    };
  }

  handleRemoveTokenFromStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  handleDecodeToken() {
    const token = localStorage.getItem('token') || '';

    return jwtDecode(token);
  }
}
