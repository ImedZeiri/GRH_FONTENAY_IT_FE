import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./pages/users/users.component";
import {UserAddComponent} from "./pages/user-add/user-add.component";
import {AuthGuard} from "../login/auth.guard";

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate:[AuthGuard],
    children: [
      { path: 'add', component: UserAddComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
