import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import { tap } from 'rxjs/operators';
import {AuthService} from "../services/login/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.GetToken();
    if (request.url.includes('/login')) {
      if (authToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
      }

    }
    return next.handle(request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.GetToken()}`,
        'Content-Type': 'application/json'
      }
    }));  }
}
