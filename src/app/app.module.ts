import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/login/page/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavigationModule} from "../UI/Material/Navigation/navigation.module";
import {MatSelectModule} from "@angular/material/select";
import {ButtonsModule} from "../UI/Material/Buttons/buttons.module";
import {LayoutModule} from "../UI/Material/Layout/layout.module";
import {DatatableModule} from "../UI/Material/DataTables/datatable.module";
import {PopupsModule} from "../UI/Material/Popups/popups.module";
import {CookieService} from 'ngx-cookie-service';
import {LoadingSpinnerComponent} from "../UI/Shared/components/loader/loading-spinner.component";
import {FormsModule} from "../UI/Material/Forms/forms.module";
import {FooterComponent} from '../UI/Shared/components/footer/footer.component'
import {AccessDeniedComponent} from "../UI/Shared/components/access-denied/access-denied.component";
import {NotFoundComponent} from "../UI/Shared/components/not-found/not-found.component";


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
import * as Highcharts from "highcharts";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    AppComponent,
    HomeComponent,
    FooterComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NavigationModule,
        MatSelectModule,
        ButtonsModule,
        LayoutModule,
        DatatableModule,
        PopupsModule,
        FormsModule,
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        CoreModule,
        SharedModule,
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        UserModule,
        CompanyModule,
        DepartmentModule,
        HomeModule,
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
