import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/login/page/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {CookieService} from 'ngx-cookie-service';


import { CoreModule } from './core/core.module';
import { SharedModule } from '../UI/Shared/shared.module';

import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {CommonModule} from "@angular/common";
import {UserModule} from "./main/user/user.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HomeComponent} from "./main/home/pages/home/home.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CompanyModule} from "./main/company/company.module";
import {HomeModule} from "./main/home/home.module";
import {DepartmentModule} from "./main/department/department.module";
import {ProjectModule} from "./main/project/project.module";
import {TaskModule} from "./main/task/task.module";
import {FormsModule} from "../UI/Material/Forms/forms.module";
import {ButtonsModule} from "../UI/Material/Buttons/buttons.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    UserModule,
    CompanyModule,
    DepartmentModule,
    HomeModule,
    ProjectModule,
    TaskModule,
    FormsModule,
    ButtonsModule
  ],
  providers: [
    CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {

}
