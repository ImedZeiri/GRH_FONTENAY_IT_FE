import {Component, Input, OnInit} from '@angular/core';
import {StatisticsService} from "../../services/statistics.service";
import {UsersService} from "../../../user/services/users.service";
import {Users} from "../../../user/services/users";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../../../../core/services/login/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {BannedComponent} from "../../../../../UI/Shared/components/banned/banned.component";
import {AccessDeniedComponent} from "../../../../../UI/Shared/components/access-denied/access-denied.component";
import {NgDialogAnimationService} from "ng-dialog-animation";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {ProjectService} from "../../../project/services/project.service";
import {Project} from "../../../project/services/project";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usersCount: number;
  companyTasksCount: number;
  projectsCount: number;
  private route: Router;
  users: Users[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName','cin', 'email', 'roles','phone','accountStatus'];
  dataSource: MatTableDataSource<any>;
  isLoading = true;
  projects: Project[];


  constructor(private statisticsService: StatisticsService,
              private service:UsersService,
              private Pservice: ProjectService,
              private authService:AuthService,
              public ngdialog: NgDialogAnimationService,
              ){}
  ngOnInit() {
    this.authService.startTokenRefreshTimer();
    this.getProjects();
    const accountStatus = localStorage.getItem('accountStatus');
    if (accountStatus === '1') {
      this.usersCount = this.statisticsService.getUsersCount();
      this.companyTasksCount = this.statisticsService.getCompanyTasksCount();
      this.projectsCount = this.statisticsService.getProjectsCount();
    }else if (accountStatus === '0') {
      const dialogRef = this.ngdialog.open(BannedComponent, {
        width: '60%',
        height:'60%',
        autoFocus: true,
        backdropClass:'backdrop-bg-accountBanned',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Résultat de la boîte de dialogue :', result);
        this.route.navigate(['login']);
      });
    }
  }

  getProjects() {
    this.Pservice.getProjects().subscribe((res) => {
      this.projects = res['hydra:member'];
      this.projects = this.mappingProjects(res['hydra:member']);
      this.isLoading = false;
    }, error => {
      console.log(error);
    });
    return this.projects;
  }

  mappingProjects(data: any[]) {
    let newProjects = data.map(item => {
      return {
        ...item
      };
    });
    return newProjects;
  }
}
