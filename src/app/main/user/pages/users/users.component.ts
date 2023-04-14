import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Users} from "../../services/users";
import {UserShowComponent} from "../user-show/user-show.component";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import {SidePanelService, SidePanelState} from "../../../../core";
import {UserAddComponent} from "../user-add/user-add.component";
import {CustomCardComponent} from "../../components/custom-card/custom-card.component";
import {AuthService} from "../../../../core/services/login/auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UserEditComponent} from "../user-edit/user-edit.component";

@Component({
  selector: 'app-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() userRights: string;

  displayedColumns: string[] = ['id', 'firstName', 'lastName','cin', 'email', 'roles','phone','accountStatus'];
  dataSource: MatTableDataSource<any>;
  users: Users[];
  selectedRow: any;
  isClickedOutside: boolean = false;
  isLoading = true;
  totalItem: number[];

  constructor( private service:UsersService ,
               private dialog: MatDialog,
               public ngdialog: NgDialogAnimationService,
               private elementRef: ElementRef,
               private _sidePanelService: SidePanelService,
               private authService:AuthService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getUsers();
    this.authService.startTokenRefreshTimer();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers(){
    this.service.getUsers().subscribe((res)=>{
      this.users = res['hydra:member'];
      this.users = this.mappingUsers(res['hydra:member']);
      this.dataSource.data = this.users;
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onRowClicked(user: any, $event: MouseEvent){
    this.selectedRow = user;
    const dialogRef = this.ngdialog.open(UserShowComponent, {
      width: '300px',
      height:'80%',
      autoFocus: true,
      data: this.selectedRow,
      position: {
        right: '0px',
        top: '13vh',
      },
      animation: { to: 'left'},
      backdropClass:'backdrop-bg-Add-User',
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
  openAddUserDialog() {
    const dialogRefAdd = this.ngdialog.open(UserAddComponent, {
      width: '350px',
      height:'100%',
      data: this.selectedRow,
      position: {
        right: '0px',
        top: '13vh',
      },
      animation: { to: 'left'},
      panelClass: 'backdrop-bg-Add-User',
      backdropClass:'backdrop-bg-Add-User',
    });

    dialogRefAdd.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getUsers();
    });
  }
  onUpdateUser(user: any) {
    const dialogRefUpdate = this.ngdialog.open(UserEditComponent, {
      width: '350px',
      height:'100%',
      data: this.selectedRow,
      position: {
        right: '0px',
        top: '13vh',
      },
      animation: { to: 'left'},
      panelClass: 'backdrop-bg-Add-User',
      backdropClass:'backdrop-bg-Add-User',
    });

    dialogRefUpdate.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getUsers();
    });
  }
  onDeleteUser(user: any) {
    const dialogRefDel = this.ngdialog.open(CustomCardComponent, {
      data: {
        message: `Are you sure you want to delete ${user.firstName} ?`,
        buttonText: {
          ok: 'Delete',
          cancel: 'cancel'
        }
      } ,
      backdropClass:'backdrop-bg-Add-User',
    });
    dialogRefDel.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.deleteUser(user.id).subscribe(() => {
          this.getUsers();
          console.log('Utilisateur supprimé avec succès');
        }, error => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        });
      }
    });
  }

}
