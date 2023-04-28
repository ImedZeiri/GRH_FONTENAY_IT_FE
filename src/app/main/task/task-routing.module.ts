import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ListComponent} from "./pages/list/list.component";
import {AddComponent} from "./pages/add/add.component";
import {AuthGuard} from "../login/auth.guard";

const routes: Routes = [
  {
    path: 'tasks',
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
export class TaskRoutingModule { }
