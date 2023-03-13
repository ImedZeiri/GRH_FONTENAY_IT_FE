import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
  HttpEvent, HttpHeaders
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {AuthService} from "../services/login/auth.service";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token')
    if (!request.url.includes('/login')&& !request.url.includes('/token/refresh')) {
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
    return next.handle(request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.GetToken()}`,
        'Content-Type': 'application/json'
      }
    }));
  }
}
