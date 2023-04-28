import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  itemContent: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.itemContent = data.itemContent;
  }

  ngOnInit(): void {
  }

}
