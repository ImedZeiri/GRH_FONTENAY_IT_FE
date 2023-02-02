import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  static accessToken = '';
  static refreshToken = '';
  refresh = false;

  constructor(
    private inject:Injector,
    private http: HttpClient) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice=this.inject.get(AuthService);
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'bearer '+authservice.GetToken()
      }
    });
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !this.refresh) {
        this.refresh = true;

        return this.http.post('http://localhost:8000/api/token/refresh', {refresh_token: authservice.GetRefreshToken}, {withCredentials: true}).pipe(
          switchMap((res: any) => {
            TokenInterceptorService.accessToken = res.token;
            return next.handle(req.clone({
              setHeaders: {
                Authorization: `Bearer ${TokenInterceptorService.accessToken}`,
                'Content-Type': 'application/json'
              }
            }));
          })
        );
      }
      this.refresh = false;
      return throwError(() => err);
    }));  }



  
}
