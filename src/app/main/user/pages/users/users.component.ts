import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Users} from "../../services/users";
import {UserShowComponent} from "../user-show/user-show.component";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import {SidePanelService, SidePanelState} from "../../../../core";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName','cin', 'email', 'roles','phone','accountStatus'];
  users: Users[];
  filterValue = '';
  selectedRow: any;
  isClickedOutside: boolean = false;
  isLoading = true;
  totalItem: number[];
  totalItemCount:number;
  @Output() totalItemCountEvent = new EventEmitter<number>();


  constructor( private service:UsersService ,
               private dialog: MatDialog,
               public ngdialog: NgDialogAnimationService,
               private elementRef: ElementRef,
               private _sidePanelService: SidePanelService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.service.getUsers().subscribe((res)=>{
      this.users = res['hydra:member'];
      this.users = this.mappingUsers(res['hydra:member']);
      this.totalItem = Array.from({length: this.users.length}, (_, index) => index + 1);
      this.totalItemCount = this.totalItem.length;
      this.totalItemCountEvent.emit(this.totalItemCount);
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();
  }

  onRowClicked(user: any, $event: MouseEvent){
    this.selectedRow = user;
    const dialogRef = this.ngdialog.open(UserShowComponent, {
      width: '300px',
      height:'80%',
      autoFocus: false,
      data: this.selectedRow,
      position: {
        right: '0px',
        top: '13vh',
      },
      animation: { to: 'left'},
      backdropClass:'backdrop-bg',
    });
      if (!this.elementRef.nativeElement.contains($event.target)) {
        this.isClickedOutside = false;
      } else {
        this.isClickedOutside = true;
        this._sidePanelService.changeState(SidePanelState.OPEN);
      }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.selectedRow && this.elementRef.nativeElement.contains(event.target)) {
      this.isClickedOutside = true;
      this.selectedRow = null;
    } else {
      this.isClickedOutside = false;
    }
  }

}
