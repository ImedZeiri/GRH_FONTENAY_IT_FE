import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {UsersService} from "../../../user/services/users.service";
import {MatDialog} from "@angular/material/dialog";
import {NgDialogAnimationService} from "ng-dialog-animation";
import {SidePanelService, SidePanelState} from "../../../../core";
import {AuthService} from "../../../../core/services/login/auth.service";
import {Department} from "../../services/department";
import {CustomCardComponent} from "../../../company/components/custom-card/custom-card.component";
import {ShowComponent} from "../show/show.component";
import {AddComponent} from "../add/add.component";
import {EditComponent} from "../edit/edit.component";
import {DepartmentService} from "../../services/department.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  rightWidth = '0%';
  leftWidth = '100%'
  toggled: boolean;
  opacity= 0;
  displayedColumns: string[] = ['id', 'name', 'capacity','category'];
  dataSource: MatTableDataSource<any>;
  departments: Department[];
  selectedRow: any;
  isClickedOutside: boolean = false;
  isLoading = true;
  totalItem: number[];
  backgroundImageUrl: string;
  userData : Observable<Response[]>;


  constructor( private service : DepartmentService,
               private UService : UsersService,
               private dialog: MatDialog,
               public ngdialog: NgDialogAnimationService,
               private elementRef: ElementRef,
               private _sidePanelService: SidePanelService,
               private authService:AuthService) {
    this.dataSource = new MatTableDataSource<any>();
  }
  toggleWidth() {
    if (this.toggled) {
      this.rightWidth = '0%';
      this.leftWidth = '100%';
      this.toggled = false;
      this.opacityOut();
    } else if (!this.toggled ) {
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
      if (opacity >= 1 ) {
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
    this.getDepartments();
    this.authService.startTokenRefreshTimer();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.backgroundImageUrl = 'https://images3.alphacoders.com/489/48957.jpg';
    this.userData = this.UService.getUser(localStorage.getItem('id'));
  }
  getDepartments(){
    this.service.getDepartments().subscribe((res)=>{
      this.departments = res['hydra:member'];
      this.departments = this.mappingCompanys(res['hydra:member']);
      this.dataSource.data = this.departments;
      this.totalItem = Array.from({length: this.departments.length}, (_, index) => index + 1);
      this.isLoading=false;
    }, error => {
      console.log(error);
    });
    return this.departments;
  }
  mappingCompanys(data:any[]){
    let newCompanys = data.map(item=>{
      return{
        ...item
      }
    })
    return newCompanys
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onRowClicked(department: any, $event: MouseEvent){
    this.selectedRow = department;
    const dialogRefAdd = this.ngdialog.open(ShowComponent, {
      width: '320px',
      height:'0px',
      data: this.selectedRow,
      position: {
        right: '0px',
        top: '-10%'
      },
      animation: { to: 'left'},
      panelClass: 'backdrop-bg-Add-User',
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
  openAddDepartmentDialog() {
    const dialogRefAdd = this.ngdialog.open(AddComponent, {
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
      this.getDepartments();
    });
  }
  onUpdateDepartment(department: any) {
    const dialogRefUpdate = this.ngdialog.open(EditComponent, {
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
      this.getDepartments();
    });
  }
  onDeleteDepartment(department: any) {
    const dialogRefDel = this.ngdialog.open(CustomCardComponent, {
      data: {
        message: `Are you sure you want to delete ${department.name} ?`,
        buttonText: {
          ok: 'Delete',
          cancel: 'cancel'
        }
      } ,
      backdropClass:'backdrop-bg-Add-User',
    });
    dialogRefDel.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.deleteDepartment(department.id).subscribe(() => {
          this.getDepartments();
          console.log('department deleted ');
        }, error => {
          console.error('Error', error);
        });
      }
    });
  }

}
