import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import { SidePanelState, DashboardLayoutConfiguration, SidePanelPosition } from './core';
import { NavigationLink } from '../UI/Shared';
import {CookieService} from "ngx-cookie-service";
import { ActivatedRoute, Router } from '@angular/router';
import {UsersService} from "./main/user/services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public configuration: DashboardLayoutConfiguration;
  public links: NavigationLink[];
  displayMenu=false;
  private users: any;
  constructor(private cookie:CookieService, private route:Router,private service:UsersService) {
    this.configuration = new DashboardLayoutConfiguration(
      SidePanelPosition.LEFT,
      SidePanelState.OPEN
    );
    this.createLinks();
  }



  private createLinks() {
    console.log(this.service.getUser(localStorage.getItem('id')));
    this.links = [
      new NavigationLink("Home", ['home'], "home"),
      new NavigationLink("Users", ['users'], "supervisor_account"),
      new NavigationLink("Copmany", ['company'], "account_balance"),
      new NavigationLink("Department", ['depatrment'], "domain"),
    ]
  }
  ngDoCheck(): void {
    if (this.route.url == '/login') {
      this.displayMenu = false
    } else {
      this.displayMenu = true
    }
  }

  ngOnInit(): void {
    this.getConnectedUser();
  }
  getConnectedUser(){
    this.service.getUsers().subscribe((res)=>{
      this.users = res['hydra:member'];
      this.users = this.mappingUsers(res['hydra:member']);
      const currentUser = this.users.find(user => user.username === localStorage.getItem('username'));
      localStorage.setItem('id',currentUser.id)
    }, error => {
      console.log(error);
    });
    return this.users.id;
  }
  mappingUsers(data:any[]){
    let newUsers = data.map(item=>{
      return{
        ...item
      }
    })
    return newUsers
  }
}
