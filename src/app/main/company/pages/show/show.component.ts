import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  @Input() data: any[];

  constructor() {}

  ngOnInit(): void {
  }
  emailEditable = false;
  locationEditable = false;
  websiteEditable = false;
  capacityEditable = false;
  taxNumberEditable = false;
  identityNumberEditable = false;
  deletedFileExpirationEditable = false;
  departmentsEditable = false;

  makeEditable(field: string) {
    switch (field) {
      case 'email':
        this.emailEditable = true;
        break;
      case 'location':
        this.locationEditable = true;
        break;
      case 'website':
        this.websiteEditable = true;
        break;
      case 'capacity':
        this.capacityEditable = true;
        break;
      case 'tax_number':
        this.taxNumberEditable = true;
        break;
      case 'identity_number':
        this.identityNumberEditable = true;
        break;
      case 'deletedFileExpiration':
        this.deletedFileExpirationEditable = true;
        break;
      case 'departments':
        this.departmentsEditable = true;
        break;
    }
  }


}
