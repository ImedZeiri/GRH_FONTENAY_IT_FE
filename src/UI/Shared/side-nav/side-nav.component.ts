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
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  navData = navbarData;
  constructor(){}
  showFiller = false;
  ngOnInit(): void {
  }


}
