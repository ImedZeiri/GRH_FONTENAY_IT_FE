import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ]
})
export class DatatableModule { }
