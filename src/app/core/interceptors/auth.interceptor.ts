import { Injectable, Injector } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/login/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  static accessToken = '';
  static refreshToken = '';
  refresh = false;

  constructor(
    private inject:Injector,
    private http: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let authservice=this.inject.get(AuthService);

    if (request.url.includes('/login') && request.url.includes('/token/refresh')) {
      let jwtToken = request.clone({
        setHeaders: {
          Authorization: 'bearer '+authservice.GetToken()
        }
      });
    }
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !this.refresh) {
        this.refresh = true;
        return this.http.post('http://localhost:8000/api/token/refresh', {refresh_token: authservice.GetRefreshToken}, {withCredentials: true}).pipe(
          switchMap((res: any) => {
            AuthInterceptor.accessToken = res.token;
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${AuthInterceptor.accessToken}`,
                'Content-Type': 'application/json'
              }
            }));
          })
        );
      }
      this.refresh = false;
      return throwError(() => err);
    }));
  }

}
