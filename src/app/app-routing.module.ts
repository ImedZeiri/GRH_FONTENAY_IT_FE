import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './security/login/login.component';
import {BodyComponent} from "./body/body.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./core/interceptors/auth.guard";
import {RoleGuard} from "./core/interceptors/role.guard";

const routes: Routes = [
  { path: "", component: AppComponent,canActivate:[AuthGuard] },
  {path:"login",component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
