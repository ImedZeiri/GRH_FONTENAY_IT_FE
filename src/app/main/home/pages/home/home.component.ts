import {Component, Input, OnInit} from '@angular/core';
import {StatisticsService} from "../../services/statistics.service";
import {UsersService} from "../../../user/services/users.service";
import {Users} from "../../../user/services/users";
import {MatTableDataSource} from "@angular/material/table";

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
  selectedRow: any;
  isClickedOutside: boolean = false;
  isLoading = true;
  totalItemUsers: number[];
  toggled: any;
  rightWidth = '0%';
  leftWidth = '100%'


  constructor(private statisticsService: StatisticsService,
              private service:UsersService) { }

  ngOnInit() {
    this.usersCount = this.statisticsService.getUsersCount();
    this.companyTasksCount = this.statisticsService.getCompanyTasksCount();
    this.projectsCount = this.statisticsService.getProjectsCount();
  }
  toggleWidth() {
    if (this.toggled) {
      this.rightWidth = '0%';
      this.leftWidth = '100%';
      this.toggled = false;
      this.selectedRow = false;
    } else
    if (!this.toggled) {
      this.rightWidth = '30%';
      this.leftWidth = '70%'
      this.toggled = false;
    }
  }

}
