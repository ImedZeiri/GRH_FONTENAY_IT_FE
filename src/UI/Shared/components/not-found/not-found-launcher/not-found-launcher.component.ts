import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-not-found-launcher',
  templateUrl: './not-found-launcher.component.html',
  styleUrls: ['./not-found-launcher.component.css']
})
export class NotFoundLauncherComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NotFoundLauncherComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
