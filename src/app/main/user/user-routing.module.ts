import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./pages/users/users.component";
import {UserAddComponent} from "./pages/user-add/user-add.component";
import {AuthGuard} from "../login/auth.guard";
import {ProfilComponent} from "./pages/profil/profil.component";

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate:[AuthGuard],
    children: [
      { path: 'add', component: UserAddComponent },
    ],
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate:[AuthGuard],
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
