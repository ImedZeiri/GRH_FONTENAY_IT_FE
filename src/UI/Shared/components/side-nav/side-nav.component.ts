import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {navbarData} from "./nav-data";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  navData = navbarData;
  sidenavWidth = 4;
  contentStart = "red";
  Expanded : boolean;
  constructor(){}
  opacityValue: any;
  ngOnInit(): void {
  }
  opacityUp() {
    this.opacityValue = 1;
  }
  opacityDown() {
    if (!this.Expanded){
      setTimeout(() => {
        this.opacityValue = 0.7;
      }, 1000);
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
