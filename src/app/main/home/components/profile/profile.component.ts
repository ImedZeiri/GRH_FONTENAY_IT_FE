import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../user/services/users.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: any;
  currentUser: any;

  constructor(private service:UsersService) { }
  getConnectedUser(){
    this.service.getUsers().subscribe((res)=>{
      this.users = res['hydra:member'];
      this.users = this.mappingUsers(res['hydra:member']);
      this.currentUser = this.users.find(user => user.username === localStorage.getItem('username'));
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
  ngOnInit(): void {
    this.getConnectedUser()
  }

}
