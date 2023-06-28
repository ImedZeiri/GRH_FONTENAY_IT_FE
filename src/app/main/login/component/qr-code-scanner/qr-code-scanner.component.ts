import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import jsQR, { QRCode } from 'jsqr';
import { QrCodeDiagLoginComponent } from '../qr-code-diag-login/qr-code-diag-login.component';
import { AuthService } from '../../../../core/services/login/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserDataService} from "../../user-data.service";
import {UsersService} from "../../../user/services/users.service";

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.css'],
})
export class QrCodeScannerComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElm: ElementRef;
  @ViewChild('canvas', { static: true }) canvasElm: ElementRef;

  private users: any;
  currentUser: any;
  videoStart = false;
  medias: MediaStreamConstraints = {
    audio: false,
    video: false,
  };
  code: QRCode | null;
  isLoading = false;
  responsedata: any;
  decodedToken: any;
  helper = new JwtHelperService();
  error: string = '';
  loginForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private service: AuthService,
    private toastr: ToastrService,
    private route: Router,
    private formBuilder: FormBuilder,
    private userDataService : UserDataService,
    private uservice : UsersService,
    private dialogRef: MatDialogRef<QrCodeScannerComponent> // Ajoutez cette ligne
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  toggleVideoMedia() {
    if (this.videoStart) {
      this.stopVideo();
    } else {
      this.startVideo();
    }
  }

  startVideo() {
    this.medias.video = true;
    navigator.mediaDevices
      .getUserMedia(this.medias)
      .then((localStream: MediaStream) => {
        this.videoElm.nativeElement.srcObject = localStream;
        this.videoStart = true;
        this.checkImage();
      })
      .catch((error) => {
        console.error(error);
        this.videoStart = false;
      });
  }

  stopVideo() {
    this.medias.video = false;
    this.videoElm.nativeElement.srcObject.getVideoTracks()[0].enabled = false;
    this.videoElm.nativeElement.srcObject.getVideoTracks()[0].stop();
    this.videoStart = false;
  }

  checkImage() {
    const WIDTH = this.videoElm.nativeElement.clientWidth;
    const HEIGHT = this.videoElm.nativeElement.clientHeight;
    this.canvasElm.nativeElement.width = WIDTH;
    this.canvasElm.nativeElement.height = HEIGHT;

    const ctx = this.canvasElm.nativeElement.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    ctx.drawImage(this.videoElm.nativeElement, 0, 0, WIDTH, HEIGHT);
    const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    this.code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });

    if (this.code !== null) {
      const qrCodeResult = this.code.data;
      const [email, password] = qrCodeResult.split(',');

      console.log(email);
      console.log(password),


      this.loginForm.patchValue({
        username: email,
        password: password,
      });

      this.isLoading = true;
      this.service.ProceedLogin(this.loginForm.value).subscribe(
        (result) => {
          try {
            this.responsedata = result;
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
              this.dialogRef.close();
              this.isLoading = false;
              this.showSuccess('Login successful', 'Login successful');
            this.dialogRef.close();
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
    } else {
      setTimeout(() => {
        this.checkImage();
      }, 100);
    }
  }

  showSuccess(message, title) {
    this.toastr.success(message, title);
  }

  showError(message, title) {
    this.toastr.error(message, title);
  }

  ngOnInit(): void {}
}
