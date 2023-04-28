import { Component, OnInit } from '@angular/core';
import {AddComponent} from "../../../project/pages/add/add.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-layout-cp',
  templateUrl: './layout-cp.component.html',
  styleUrls: ['./layout-cp.component.css']
})
export class LayoutCPComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  OpenDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '80%',
      height:'90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Résultat de la boîte de dialogue :', result);
    });
  }
}
