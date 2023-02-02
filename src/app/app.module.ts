import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SideNavComponent} from "../UI/Shared/side-nav/side-nav.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavigationModule} from "../UI/Material/Navigation/navigation.module";
import {MatSelectModule} from "@angular/material/select";
import {ButtonsModule} from "../UI/Material/Buttons/buttons.module";
import {LayoutModule} from "../UI/Material/Layout/layout.module";
import {BodyComponent} from "./body/body.component";
import {DatatableModule} from "../UI/Material/DataTables/datatable.module";
import {PopupsModule} from "../UI/Material/Popups/popups.module";
import {TokenInterceptorService} from "./core/services/login/token-interceptor.service";
import {CookieService} from 'ngx-cookie-service';
import {LoadingSpinnerComponent} from "../UI/Shared/loader/loading-spinner.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    BodyComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NavigationModule,
    MatSelectModule,
    ButtonsModule,
    LayoutModule,
    DatatableModule,
    PopupsModule,
    FormsModule,



  ],
  providers: [CookieService,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],

  bootstrap: [AppComponent]
})
export class AppModule { }
