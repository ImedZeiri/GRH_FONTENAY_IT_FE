import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/login/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  responsedata: any;

  constructor(private service: AuthService,private route:Router) {
    localStorage.clear();
  }
  Login = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  ngOnInit(): void {
  }
  ProceedLogin() {
    this.isLoading = true;
    if (this.Login.valid) {
      this.service.ProceedLogin(this.Login.value).subscribe(result => {
        if(result!=null){
          this.responsedata=result;
          localStorage.setItem('refresh_token',this.responsedata.refresh_token)
          localStorage.setItem('token',this.responsedata.token)
          this.route.navigate([''])
          console.log("done !!");
          console.log(this.responsedata.refresh_token);
          console.log(this.responsedata.token);
          this.isLoading = false;
        }

      });
    }
  }

}
