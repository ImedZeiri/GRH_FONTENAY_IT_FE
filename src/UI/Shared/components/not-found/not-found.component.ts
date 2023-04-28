import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AccessDeniedComponent} from "../access-denied/access-denied.component";
import {ShowComponent} from "../../../../app/main/department/pages/show/show.component";
import {SidePanelState} from "../../../../app/core";
import {NgDialogAnimationService} from "ng-dialog-animation";
import {NotFoundLauncherComponent} from "./not-found-launcher/not-found-launcher.component";
import {CustomCardComponent} from "../../../../app/main/company/components/custom-card/custom-card.component";
import { Location } from '@angular/common'; // Importe le service Location pour la redirection

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(private dialog: MatDialog, private location: Location) {}

  OpenDialog(): void {
    const dialogRef = this.dialog.open(NotFoundLauncherComponent, {
      width: '80%',
      height:'80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Résultat de la boîte de dialogue :', result);
      this.location.back();
    });
  }

  ngOnInit(): void {
    this.OpenDialog();
  }

}
