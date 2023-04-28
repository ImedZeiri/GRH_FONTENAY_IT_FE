import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {UsersService} from "../../../user/services/users.service";
import {CompanyService} from "../../../company/services/company.service";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShowComponent implements OnInit {
  userIdList: any[];
  companyId: any;
  users: any[] = [];
  company: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShowComponent>,
    private userService: UsersService,
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.userIdList = this.data.userId;
    this.companyId = this.data.companyId;

    // Get user info based on their ID
    this.userIdList.forEach((userId) => {
      this.userService.getUser(userId).subscribe((user) => {
        this.users.push(user);
      });
    });

    // Get company info based on its ID
    this.companyService.getCompany(this.companyId).subscribe((company) => {
      this.company = company;
    });
  }
}
