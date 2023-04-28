import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-associate',
  templateUrl: './list-associate.component.html',
  styleUrls: ['./list-associate.component.css']
})
export class ListAssociateComponent implements OnInit {
  @Input() associates: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
