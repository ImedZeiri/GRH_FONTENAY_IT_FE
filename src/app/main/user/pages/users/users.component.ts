import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';

import { UsersService } from '../../services/users.service';
import { Users } from '../../services/users';
import { UserAddComponent } from '../user-add/user-add.component';
import { CustomCardComponent } from '../../components/custom-card/custom-card.component';
import { AuthService } from '../../../../core/services/login/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'cin', 'email', 'roles', 'phone', 'accountStatus'];
  users: Users[];
  isClickedOutside: boolean = false;
  isLoading = false;
  totalItem: number[];
  rightWidth = '0%';
  leftWidth = '70%';
  rightStatWidth = '30%'
  selectedRow: any = false;
  toggled: boolean;
  opacity = 0;

  constructor(
    private service: UsersService,
    private dialog: MatDialog,
    public ngdialog: NgDialogAnimationService,
    private elementRef: ElementRef,
    private authService: AuthService
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }
  toggleWidth() {
    if (this.toggled) {
      this.rightWidth = '0%';
      this.leftWidth = '70%';
      this.rightStatWidth='30%'
      this.toggled = false;
      this.opacityOut();
    } else if (!this.toggled) {
      this.rightStatWidth = '0%';
      this.rightWidth = '25%';
      this.leftWidth = '75%';
      this.toggled = true;
      this.opacityIn();
    }
  }

  opacityIn() {
    let opacity = 0;
    const intervalId = setInterval(() => {
      opacity += 0.1;
      this.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(intervalId);
      }
    }, 20);
  }

  opacityOut() {
    let opacity = 1;
    const intervalId = setInterval(() => {
      opacity -= 0.1;
      this.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(intervalId);
      }
    }, 20);
  }

  ngOnInit(): void {
    this.getUsers();
    this.authService.startTokenRefreshTimer();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers() {
    this.service.getUsers().subscribe((res) => {
      this.users = res['hydra:member'];
      this.users = this.mappingUsers(res['hydra:member']);
      this.dataSource.data = this.users;
      this.totalItem = Array.from({ length: this.users.length });
      this.isLoading = true;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowSelected(user: Users) {
    this.selectedRow = user;
    this.toggled = false;
    this.toggleWidth();
  }
  openAddUserDialog() {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '400px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getUsers();
      }
    });
  }

  openEditUser(user: Users) {
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

  mappingUsers(data: any[]) {
    let newUsers = data.map(item => {
      return {
        ...item
      }
    })
    return newUsers;
  }

}
