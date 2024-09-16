import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";


export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('token');

  if (token) {
    req.headers.set('Authorization', `Bearer ${token}`);
  }

  return next(req);
}