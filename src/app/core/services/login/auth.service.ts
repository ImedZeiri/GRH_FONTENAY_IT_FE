import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from "rxjs/operators";
import {catchError, interval, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {UsersService} from "../../../main/user/services/users.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl='http://127.0.0.1:8000/api/login';
  constructor(private http:HttpClient,private router: Router) {
   }
   ProceedLogin(UserCred:any){
     return this.http.post(this.apiurl,UserCred);
   }
   IsLoggedIn(){
     return localStorage.getItem('token')!=null;
   }
   GetToken(){
    return localStorage.getItem('token')||'';
   }

   GetRefreshToken(){
     const refreshToken = localStorage.getItem('refresh_token');
     const body = {
       refresh_token: refreshToken
     };
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + localStorage.getItem('token')
       })
     };
     return this.http.post(`http://127.0.0.1:8000/api/token/refresh`, body,httpOptions).pipe(
       tap(response => {
         const authToken = response['token'];
         localStorage.setItem('token', authToken);
       })
     );
  }
  updateToken(): Observable<any> {
    return this.GetRefreshToken().pipe(
      tap(() => console.log('Token updated')),
      catchError((error) => {
        console.error('Session expired :', error);
        this.router.navigate(['/login']);
        return throwError(error);
      })
    );
  }
  startTokenRefreshTimer() {
    interval(1 * 60 * 1000).pipe(
      tap(() => this.updateToken().subscribe())
    ).subscribe();
  }

  HaveAccess(){
     var loggintoken=localStorage.getItem('token')||'';
     var _extractedtoken=loggintoken.split('.')[1];
     var _atobdata=atob(_extractedtoken);
     var _finaldata=JSON.parse(_atobdata);
     if(_finaldata.role=='ROLE_USER'){
       return true
     }else{
       alert('you not having access');
       return false
     }
   }

}
