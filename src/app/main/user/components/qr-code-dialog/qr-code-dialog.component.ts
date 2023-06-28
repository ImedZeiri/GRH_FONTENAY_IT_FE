import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.css']
})
export class QrCodeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<QrCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { qrCodeImage: string }
  ) { }

  printQRCode() {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
      printWindow.document.write(`<img src="${this.data.qrCodeImage}" alt="QR Code">`);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  }


  ngOnInit(): void {
  }

}
