import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  name: string;
  description: string;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.name)
  }
}
