import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule

  ],
  exports: [
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class NavigationModule { }
