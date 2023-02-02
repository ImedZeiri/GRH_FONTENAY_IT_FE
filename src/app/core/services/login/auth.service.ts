import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl='http://127.0.0.1:8000/api/login';
  constructor(private http:HttpClient) {

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
    return localStorage.getItem('refresh_token')||'';
   }

   HaveAccess(){
     var loggintoken=localStorage.getItem('token')||'';
     var _extractedtoken=loggintoken.split('.')[1];
     var _atobdata=atob(_extractedtoken);
     var _finaldata=JSON.parse(_atobdata);
     if(_finaldata.role=='ROLE_USER'){
       console.log(_finaldata.role)
       return true
     }else{
       alert('you not having access');
       return false
     }
   }
}
