import {Component, DoCheck, EventEmitter, Output} from '@angular/core';
import { SidePanelState, DashboardLayoutConfiguration, SidePanelPosition } from './core';
import { NavigationLink } from '../UI/Shared';
import {CookieService} from "ngx-cookie-service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public configuration: DashboardLayoutConfiguration;
  public links: NavigationLink[];
  displayMenu=false;


  constructor(private cookie:CookieService,private route:Router) {
    this.configuration = new DashboardLayoutConfiguration(
      SidePanelPosition.LEFT,
      SidePanelState.OPEN
    );
    this.createLinks();
  }

  private createLinks() {
    this.links = [
      new NavigationLink("Home", ['home'], "home"),
      new NavigationLink("Users", ['users'], "supervisor_account"),

    ]
  }
  ngDoCheck(): void {
    if (this.route.url == '/login') {
      this.displayMenu = false
    } else {
      this.displayMenu = true
    }
  }
}
