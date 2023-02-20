import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './security/login/login.component';
import {AppComponent} from "./app.component";
import {AuthGuard} from "./security/login/auth.guard";
import {RoleGuard} from "./security/login/role.guard";
import {NotFoundComponent} from "../UI/Shared/not-found/not-found.component";
import {AccessDeniedComponent} from "../UI/Shared/access-denied/access-denied.component";
import {UsersComponent} from "./users/users/users.component";
import {UserShowComponent} from "./users/user-show/user-show.component";
import {UserAddComponent} from "./users/user-add/user-add.component";
import {UserEditComponent} from "./users/user-edit/user-edit.component";

const routes: Routes = [
  { path: "",component: AppComponent,canActivate:[AuthGuard] },
  { path:"login",component:LoginComponent},
  { path:"users",component:UsersComponent},
  { path: 'user-show/:id', component: UserShowComponent, data: { title: 'Users Details' }},
  { path: 'user-add', component: UserAddComponent, data: { title: 'Add User' }},
  { path: 'user-edit/:id', component: UserEditComponent, data: { title: 'Edit User' }},
  { path:"**",component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
