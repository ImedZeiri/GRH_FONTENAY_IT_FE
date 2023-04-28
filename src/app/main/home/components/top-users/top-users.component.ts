import { Component, OnInit } from '@angular/core';
import {Users} from "../../../user/services/users";
import {MatTableDataSource} from "@angular/material/table";
import {UsersService} from "../../../user/services/users.service";

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
  styleUrls: ['./top-users.component.css']
})
export class TopUsersComponent implements OnInit {
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

  constructor(private service:UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.service.getUsers().subscribe((res)=>{
      this.users = res['hydra:member'];
      this.users = this.mappingUsers(res['hydra:member']);
      this.dataSource.data = this.users;
      this.totalItemUsers = Array.from({length: this.users.length}, (_, index) => index + 1);
      this.isLoading=false;
    }, error => {
      console.log(error);
    });
    return this.users;
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
