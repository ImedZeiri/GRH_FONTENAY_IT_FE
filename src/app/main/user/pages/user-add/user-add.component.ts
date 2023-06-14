import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EmailService } from "../../services/email.service";
import * as QRCode from 'qrcode';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {QrCodeDialogComponent} from "../../components/qr-code-dialog/qr-code-dialog.component";

@Component({
  selector: 'app-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  toppingList: string[] = ['Info', 'RH', 'security', 'Other'];
  public breakpoint: number; // Breakpoint observer code
  public fname: string = ``;
  public lname: string = ``;
  qrCodeImage: string;

  AddUserForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: UsersService,
    private emailService: EmailService,
    private dialog: MatDialog
  ) {
    this.AddUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      birthday: ['', Validators.required],
      hiringDate: ['', Validators.required],
      accountStatus: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      plainPassword: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      roles: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.AddUserForm = this.formBuilder.group({
      firstname: [this.fname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      lastname: [this.lname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: [0, Validators.required,, Validators.pattern('[0-9]+([0-9 ]+)*')],
      birthday: ['2023-01-24T00:00:00+00:00', Validators.required],
      hiringDate: ['2023-01-24T00:00:00+00:00', Validators.required],
      accountStatus: [1, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      plainPassword: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      roles: ['', Validators.required],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  onSubmit(user: FormGroup) {
    const generatedPassword = this.generatePassword();
    user.patchValue({ plainPassword: generatedPassword });

    this.service.addUsers(user.value).subscribe(
      (response) => {
        console.log(response);
        this.sendEmail(user.value.email, generatedPassword);

        const qrData = `${user.value.email},${generatedPassword}`;
        QRCode.toDataURL(qrData, (err, url) => {
          if (err) {
            console.error(err);
            return;
          }
          this.qrCodeImage = url;

          const dialogRef = this.dialog.open(QrCodeDialogComponent, {
            data: {
              qrCodeImage: this.qrCodeImage
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog closed');
          });
        });

        this.openSnackBar('User added', '');
      },
      (error) => {
        console.error(error);
        this.openSnackBar('Error adding user', '');
      }
    );
  }

  generatePassword(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }

  sendEmail(email: string, password: string) {
    const subject = 'Welcome to YourApp';
    const body = password ;

    this.emailService.sendEmail(email, subject, body).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
