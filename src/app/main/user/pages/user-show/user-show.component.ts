import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Users } from "../../services/users";
import {UserEditComponent} from "../user-edit/user-edit.component";

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent implements OnInit {
  @Input() data: Users;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openEditDialog(): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '300px',
      data: { user: this.data }
    });

    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        // Handle the updated user data here
        console.log(updatedUser);
        // You can call the appropriate service method to update the user
      }
    });
  }
}
