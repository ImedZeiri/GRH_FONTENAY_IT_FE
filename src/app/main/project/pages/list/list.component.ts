import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from "../../../../core/services/login/auth.service";
import { ProjectService } from "../../services/project.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Project } from "../../services/project";
import { MatDialog } from '@angular/material/dialog';
import {ShowComponent} from "../show/show.component";
import {AddComponent} from "../add/add.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() rowSelected = new EventEmitter<any>();
  displayedColumns: string[] = ['id', 'name', 'startAt', 'endAt', 'field', 'owner'];
  dataSource: MatTableDataSource<any>;
  projects: Project[];
  isLoading = true;
  totalItem: number[];
  rightWidth = '0%';
  leftWidth = '100%';
  selectedRow: any = false;
  toggled: boolean;
  opacity = 0;

  constructor(
    private authService: AuthService,
    private service: ProjectService,
    private dialog: MatDialog
  ) {}

  getProjects() {
    this.service.getProjects().subscribe((res) => {
      this.projects = res['hydra:member'];
      this.projects = this.mappingProjects(res['hydra:member']);
      this.dataSource.data = this.projects;
      this.totalItem = Array.from({ length: this.projects.length }, (_, index) => index + 1);
      this.isLoading = false;
    }, error => {
      console.log(error);
    });
    return this.projects;
  }

  mappingProjects(data: any[]) {
    let newProjects = data.map(item => {
      return {
        ...item
      };
    });
    return newProjects;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowSelected(project: Project): void {
    this.selectedRow = project;
    this.rowSelected.emit(project);
  }

  openProject(project: Project): void {
    const dialogRef = this.dialog.open(ShowComponent, {
      width: '400px',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogue fermé');
    });
  }

  toggleWidth() {
    if (this.toggled) {
      this.rightWidth = '0%';
      this.leftWidth = '100%';
      this.toggled = false;
      this.opacityOut();
    } else if (!this.toggled) {
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
    this.getProjects();
    this.authService.startTokenRefreshTimer();
  }

  onRowClicked(project: any, $event: MouseEvent){
    this.selectedRow = project;
    this.rowSelected.emit(this.selectedRow);
    this.toggled = false;
    this.toggleWidth();
  }
  OpenDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '30%',
      height:'90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Résultat de la boîte de dialogue :', result);
    });
  }

}
