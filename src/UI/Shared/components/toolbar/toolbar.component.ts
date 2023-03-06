import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  contentStart = "red";
  Expanded : boolean;
  opacityValue: any;
  sidenavWidth = 4;
  constructor() { }

  ngOnInit(): void {
  }

  opacityUp() {
    this.opacityValue = 1;
  }
  opacityDown() {
    if (!this.Expanded){
      setTimeout(() => {
        this.opacityValue = 0.8;
      }, 4000);
    }
  }
  toggle(Expanded: boolean){
    this.Expanded = !this.Expanded
    if (this.Expanded == false){
      this.contentStart = "blue";
      this.sidenavWidth = 4;
      console.log(this.Expanded);
    }else {
      this.contentStart = "green";
      this.sidenavWidth = 16;
      console.log('expanded',this.Expanded);
    }
  }



}
