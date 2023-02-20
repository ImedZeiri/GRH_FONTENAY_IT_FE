import {Component, DoCheck, EventEmitter, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {SideNavComponent} from '../UI/Shared/side-nav/side-nav.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  @Output() onToggleSideNav: EventEmitter<SideNavComponent> = new EventEmitter();
  title = 'GRH_FONTENAY_IT_FE';
  displayMenu=false;
  constructor(private cookie:CookieService,private route:Router){

  }
  ngDoCheck(): void {
    if (this.route.url == '/login') {
      this.displayMenu = false
    } else {
      this.displayMenu = true
    }
  }

}
