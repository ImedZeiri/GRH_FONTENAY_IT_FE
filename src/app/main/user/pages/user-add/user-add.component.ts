import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  toppingList: string[] = ['Info','RH','security','Other'];
  public breakpoint: number; // Breakpoint observer code
  public fname: string = ``;
  public lname: string = ``;

  AddUserForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private service:UsersService) {
    this.AddUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      birthday: ['', Validators.required],
      hiringDate: ['', Validators.required],
      accountStatus: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
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
      accountStatus: [1,Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['',Validators.required]
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }
  onSubmit(user: FormGroup) {
    console.log(typeof this.AddUserForm);
    this.service.addUsers(user.value).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
    this.openSnackBar('user added','')
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
