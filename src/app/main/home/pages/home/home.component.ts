import {Component, Input, OnInit} from '@angular/core';
import {StatisticsService} from "../../services/statistics.service";
import {UsersService} from "../../../user/services/users.service";
import {Users} from "../../../user/services/users";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../../../../core/services/login/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usersCount: number;
  companyTasksCount: number;
  projectsCount: number;
  users: Users[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName','cin', 'email', 'roles','phone','accountStatus'];
  dataSource: MatTableDataSource<any>;
  isLoading = true;

  constructor(private statisticsService: StatisticsService,
              private service:UsersService,
              private authService:AuthService){}
  ngOnInit() {
    this.authService.startTokenRefreshTimer();
    this.usersCount = this.statisticsService.getUsersCount();
    this.companyTasksCount = this.statisticsService.getCompanyTasksCount();
    this.projectsCount = this.statisticsService.getProjectsCount();
  }
}
