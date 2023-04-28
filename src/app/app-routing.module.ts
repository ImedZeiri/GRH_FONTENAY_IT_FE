import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from "./main/login/auth.guard";
import {LoginComponent} from "./main/login/page/login.component";
import {NotFoundComponent} from "../UI/Shared/components/not-found/not-found.component";
import {UserRoutingModule} from "./main/user/user-routing.module";
import {HomeRoutingModule} from "./main/home/home-routing.module";
import {CompanyRoutingModule} from "./main/company/company-routing.module";
import {DepartmentRoutingModule} from "./main/department/department-routing.module";
import {ProjectRoutingModule} from "./main/project/project-routing.module";
import {TaskRoutingModule} from "./main/task/task-routing.module";



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component:NotFoundComponent,
    canActivate:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false}),
    UserRoutingModule,
    CompanyRoutingModule,
    HomeRoutingModule,
    DepartmentRoutingModule,
    ProjectRoutingModule,
    TaskRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
