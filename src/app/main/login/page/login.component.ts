import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/login/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import {QrCodeScannerComponent} from "../component/qr-code-scanner/qr-code-scanner.component";
import {UserDataService} from "../user-data.service";
import {UsersService} from "../../user/services/users.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  responsedata: any;
  decodedToken: any;
  helper = new JwtHelperService();
  error: string = '';
  private users: any;
  currentUser: any;

  constructor(
    private service: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private userDataService : UserDataService,
    private uservice : UsersService

  ) {
    localStorage.clear();
  }

  Login = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false)
  });

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
      this.Login.patchValue({
        username: storedUsername,
        password: storedPassword,
        rememberMe: true
      });
    }
  }

  showSuccess(message, title) {
    this.toastr.success(message, title);
  }

  showError(message, title) {
    this.toastr.error(message, title);
  }

  ProceedLogin() {
    if (this.Login.valid) {
      this.isLoading = true;
      this.service.ProceedLogin(this.Login.value).subscribe(
        (result) => {
          try {
            this.responsedata = result;
            this.userDataService.setResponsedata(this.responsedata);
            localStorage.setItem('refresh_token', this.responsedata.refresh_token);
            localStorage.setItem('token', this.responsedata.token);
            this.decodedToken = this.helper.decodeToken(this.responsedata.token);
            localStorage.setItem('username', this.decodedToken.username);

            this.uservice.getUsers().subscribe((res) => {
              this.users = res['hydra:member'];
              this.currentUser = this.users.find(user => user.username === localStorage.getItem('username'));
              localStorage.setItem('id', this.currentUser.id);
              localStorage.setItem('accountStatus', this.currentUser.accountStatus);

              localStorage.setItem('roles', this.decodedToken.roles.toString());
              this.route.navigate(['home']);
              this.isLoading = false;
              this.showSuccess('Login successful', 'Login successful');
            }, error => {
              console.log(error);
            });
          } catch (error) {
            this.error = 'Login failed';
            this.showError('Login Failed', 'Login Failed');
            this.isLoading = false;
          }
        },
        (error) => {
          this.error = 'Login failed';
          this.showError('Login Failed', 'Login Failed');
          this.isLoading = false;
        }
      );

      if (this.Login.value.rememberMe) {
        localStorage.setItem('username', this.Login.value.username);
        localStorage.setItem('password', this.Login.value.password);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
    }
  }

  openQRCodeScannerDialog() {
    const dialogRef = this.dialog.open(QrCodeScannerComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('QR code scanner dialog closed');
    });
  }
}
