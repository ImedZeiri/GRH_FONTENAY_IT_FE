import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Users} from "../../../user/services/users";
import {UsersService} from "../../../user/services/users.service";

@Component({
  selector: 'app-tab-users',
  templateUrl: './tab-users.component.html',
  styleUrls: ['./tab-users.component.css']
})
export class TabUsersComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName','email','phone'];
  dataSource: MatTableDataSource<any>;
  users: Users[];
  private totalItem: number[];
  private isLoading: boolean;
  constructor(private service:UsersService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.service.getUsers().subscribe((res)=>{
      this.users = res['hydra:member'];
      this.users = this.mappingUsers(res['hydra:member']);
      this.dataSource.data = this.users.slice(0, 5);;
      this.totalItem = Array.from({length: this.users.length}, (_, index) => index + 1);
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
