import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';

@Component({
  selector: 'app-banned',
  templateUrl: './banned.component.html',
  styleUrls: ['./banned.component.css']
})
export class BannedComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<BannedComponent>, private router: Router) { }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  navigateToLogin() {
    this.dialogRef.close();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
    window.location.reload();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
