import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Users} from "../../services/users";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
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
    return this.currentUser;
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
