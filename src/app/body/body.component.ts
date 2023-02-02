import { Component, OnInit } from '@angular/core';
import {users} from './tab-content'
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onclick(user:any){
    console.log(user);
  }

}
