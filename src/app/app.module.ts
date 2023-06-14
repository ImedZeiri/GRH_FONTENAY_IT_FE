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
import { QrCodeDiagLoginComponent } from './main/login/component/qr-code-diag-login/qr-code-diag-login.component';
import {MatDialogModule} from "@angular/material/dialog";
import { QrCodeScannerComponent } from './main/login/component/qr-code-scanner/qr-code-scanner.component';
import {LayoutModule} from "../UI/Material/Layout/layout.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppComponent,
    HomeComponent,
    QrCodeDiagLoginComponent,
    QrCodeScannerComponent,

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
    ButtonsModule,
    MatDialogModule,
    LayoutModule
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
