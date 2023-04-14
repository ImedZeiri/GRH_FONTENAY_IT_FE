import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./pages/users/users.component";
import {UserAddComponent} from "./pages/user-add/user-add.component";
import {AuthGuard} from "../login/auth.guard";

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: 'add', component: UserAddComponent ,canActivate:[AuthGuard]},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
