import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import { SidePanelState, DashboardLayoutConfiguration, SidePanelPosition } from './core';
import { NavigationLink } from '../UI/Shared';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {UsersService} from "./main/user/services/users.service";
import {MatDialog} from "@angular/material/dialog";
import {AccessDeniedComponent} from "../UI/Shared/components/access-denied/access-denied.component";
import { Location } from '@angular/common';
import {UserShowComponent} from "./main/user/pages/user-show/user-show.component";
import {NgDialogAnimationService} from "ng-dialog-animation"; // Importe le service Location pour la redirection


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public configuration: DashboardLayoutConfiguration;
  public linksAdmin: NavigationLink[];
  public linksUser: NavigationLink[];
  public links: NavigationLink[];
  private deniedPathsUser: string[]
  private deniedPath: string[]
  displayMenu=false;

  private users: any;
  constructor(private cookie:CookieService, private route:Router,private service:UsersService,private dialog: MatDialog, private location: Location,               public ngdialog: NgDialogAnimationService,
  ) {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const previousUrl = this.route.url;
        const currentUrl = event.url;

        if (previousUrl.includes('/login')) {
          this.route.navigateByUrl(currentUrl);
        }
      }
    });
    this.configuration = new DashboardLayoutConfiguration(
      SidePanelPosition.LEFT,
      SidePanelState.OPEN
    );
    this.createLinks();

    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAccess(event.url);
      }
    });
  }


  checkAccess(currentPath: string): void {
    const AccessDenied = this.deniedPath.includes(currentPath);

    if (AccessDenied) {
      const dialogRef = this.ngdialog.open(AccessDeniedComponent, {
        width: '60%',
        height:'60%',
        autoFocus: true,
        backdropClass:'backdrop-bg-accessDenied',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Résultat de la boîte de dialogue :', result);
        this.location.back();
      });
    }
  }

  private createLinks() {
    console.log(this.service.getUser(localStorage.getItem('id')));
    this.deniedPathsUser= [
      '/users',
      '/company',
      '/department',
    ];
    this.linksAdmin = [
      new NavigationLink("Home", ['home'], "home"),
      new NavigationLink("Users", ['users'], "supervisor_account"),
      new NavigationLink("Client", ['company'], "account_balance"),
      new NavigationLink("Department", ['department'], "domain"),
      new NavigationLink("projects", ['projects'], "business_center"),
      new NavigationLink("tasks", ['tasks'], "task"),
    ];
    this.linksUser = [
      new NavigationLink("Home", ['home'], "home"),
      new NavigationLink("projects", ['projects'], "business_center"),
      new NavigationLink("tasks", ['tasks'], "task"),
    ]
    const roles = localStorage.getItem('roles');

    if (roles) {
      if (roles.includes('ADMIN')) {
        this.links = this.linksAdmin;
      } else if (!roles.includes('ADMIN')) {
        this.links = this.linksUser;
        this.deniedPath= this.deniedPathsUser
      }
    }

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
