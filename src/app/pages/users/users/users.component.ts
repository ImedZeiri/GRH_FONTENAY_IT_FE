import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../core/services/users/users.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public data: Object;
  constructor( private service:UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.service.getUsers().subscribe((res)=>{
      this.data = res['hydra:member'];
      this.data = res.valueOf();
      }, error => {
      console.log(error);
    });
    console.log(this.service.getUsers());
  }

}
