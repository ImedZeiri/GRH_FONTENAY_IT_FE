import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {ShowComponent} from "../show/show.component";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import {SidePanelService, SidePanelState} from "../../../../core";
import {AddComponent} from "../add/add.component";
import {CustomCardComponent} from "../../components/custom-card/custom-card.component";
import {AuthService} from "../../../../core/services/login/auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {EditComponent} from "../edit/edit.component";
import {Company} from "../../services/company";
import {UsersService} from "../../../user/services/users.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() rowSelected = new EventEmitter<any>();

  rightWidth = '0%';
  leftWidth = '100%'
  displayedColumns: string[] = ['id', 'name', 'email','website', 'location', 'category','phone'];
  dataSource: MatTableDataSource<any>;
  copmanys: Company[];
  selectedRow: any=false;
  CityName : any;
  isClickedOutside: boolean = false;
  isLoading = true;
  totalItem: number[];
  userData : Observable<Response[]>;
  copmanyAssociates: any[];
  copmanyAssociatesID: any;
  filteredAssociated: any[];
  toggled: boolean;
  opacity= 0;

  constructor( private service:CompanyService ,
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
    this.getCompanies();
    this.authService.startTokenRefreshTimer();
    this.userData = this.UService.getUser(localStorage.getItem('id'));
    this.getCompanyAssociates();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getCompanies(){
    this.service.getCompanys().subscribe((res)=>{
      this.copmanys = res['hydra:member'];
      this.copmanys = this.mappingCompanys(res['hydra:member']);
      this.dataSource.data = this.copmanys;
      this.totalItem = Array.from({length: this.copmanys.length}, (_, index) => index + 1);
      this.isLoading=false;
    }, error => {
      console.log(error);
    });
    return this.copmanys;
  }
  getCompanyAssociates(){
    this.service.getCompanyAssociates().subscribe((res)=>{
      this.copmanyAssociates = res['hydra:member'];
      this.copmanyAssociates = this.mappingCompanys(res['hydra:member']);
    }, error => {
      console.log(error);
    });
    return this.copmanyAssociates;
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
  onRowClicked(copmany: any, $event: MouseEvent){
    this.selectedRow = copmany;
    this.rowSelected.emit(this.selectedRow);
    this.toggled = false;
    this.toggleWidth();
    this.CityName = copmany['location']
    try {
      this.copmanyAssociatesID = parseInt((this.selectedRow.companyAssociates[0]).slice(-1));
      const totalAssociated = this.getCompanyAssociates();
      this.filteredAssociated = totalAssociated.filter(assoc => assoc.id === this.copmanyAssociatesID);
    } catch (error) {
      console.error(error);
    }
  }

  openAddCompanyDialog() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '400px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getCompanies();
    });
  }
  onUpdateCompany(copmany: any) {
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
      this.getCompanies();
    });
  }
  onDeleteCompany(copmany: any) {
    const dialogRefDel = this.ngdialog.open(CustomCardComponent, {
      data: {
        message: `Are you sure you want to delete ${copmany.name} ?`,
        buttonText: {
          ok: 'Delete',
          cancel: 'cancel'
        }
      } ,
      backdropClass:'backdrop-bg-Add-User',
    });
    dialogRefDel.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.deleteCompany(copmany.id).subscribe(() => {
          this.getCompanies();
          console.log('Company deleted ');
        }, error => {
          console.error('Error', error);
        });
      }
    });
  }

}
