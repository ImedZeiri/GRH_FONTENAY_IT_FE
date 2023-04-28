import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "../login/auth.guard";
import {ListComponent} from "./pages/list/list.component";
import {AddComponent} from "./pages/add/add.component";

const routes: Routes = [
  {
    path: 'department',
    component: ListComponent,
    canActivate:[AuthGuard],
    children: [
      { path: 'add', component: AddComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
