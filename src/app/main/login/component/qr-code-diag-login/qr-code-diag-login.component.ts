import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { QRCode } from 'jsqr';

@Component({
  selector: 'app-qr-code-diag-login',
  templateUrl: './qr-code-diag-login.component.html',
  styleUrls: ['./qr-code-diag-login.component.css']
})
export class QrCodeDiagLoginComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QrCodeDiagLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QRCode
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
