import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/login/auth.service';
import {JwtHelperService} from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  responsedata: any;
  decodedToken:any;
  helper = new JwtHelperService;
  error : string ='';

  constructor(private service: AuthService ,private route:Router ,private toastr: ToastrService) {
    localStorage.clear();
  }
  Login = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  ngOnInit(): void {
  }
  showSuccess(message, title){
    this.toastr.success(message, title)
  }

  showError(message, title){
    this.toastr.error(message, title)
  }
  ProceedLogin() {
    if (this.Login.valid) {
      this.isLoading = true;
      this.service.ProceedLogin(this.Login.value).subscribe(result => {
        if(result!=null){
          this.responsedata=result;
          localStorage.setItem('refresh_token',this.responsedata.refresh_token);
          localStorage.setItem('token',this.responsedata.token);
          this.decodedToken = this.helper.decodeToken(this.responsedata.token);
          localStorage.setItem('username',this.decodedToken.username);
          this.route.navigate(['home']);
          console.log("done !!");
          console.log(this.responsedata.refresh_token);
          console.log(this.responsedata.token);
          console.log(this.decodedToken.username);
          this.isLoading = false;
          alert('login sucess')
        }
        else {
          this.error = 'Login failed';
          this.isLoading = false;
          window.location.reload();
        }
      });
    }
  }
}
