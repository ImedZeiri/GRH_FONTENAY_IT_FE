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
import {ListAssociateComponent} from "../../components/list-associate/list-associate.component";
import {stringify} from "@angular/compiler/src/util";



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'email','website', 'location', 'category','phone'];
  dataSource: MatTableDataSource<any>;
  copmanys: Company[];
  selectedRow: any;
  isClickedOutside: boolean = false;
  isLoading = true;
  totalItem: number[];
  backgroundImageUrl: string;
  userData : Observable<Response[]>;
  copmanyAssociates: any[];
  copmanyAssociatesID: any;
  filteredAssociated: any[];

  constructor( private service:CompanyService ,
               private UService : UsersService,
               private dialog: MatDialog,
               public ngdialog: NgDialogAnimationService,
               private elementRef: ElementRef,
               private _sidePanelService: SidePanelService,
               private authService:AuthService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getCompanies();
    this.authService.startTokenRefreshTimer();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.backgroundImageUrl = 'https://images3.alphacoders.com/489/48957.jpg';
    this.userData = this.UService.getUser(localStorage.getItem('id'));
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
    try {
        this.copmanyAssociatesID = parseInt((this.selectedRow.companyAssociates[0]).slice(-1));
        const totalAssociated = this.getCompanyAssociates();
        this.filteredAssociated = totalAssociated.filter(assoc => assoc.id === this.copmanyAssociatesID);
        console.log(this.filteredAssociated);
    } catch (error) {
      console.error(error);
    }

    const dialogRefAdd = this.ngdialog.open(ShowComponent, {
      width: '300px',
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
  openAddCompanyDialog() {
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
