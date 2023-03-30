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
import {HeadersInterceptor} from "./core/interceptors/headers.interceptor";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {CommonModule} from "@angular/common";
import {UserModule} from "./main/user/user.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HomeComponent} from "./main/home/pages/home/home.component";
import {WidgetComponent} from "./main/home/components/widget/widget.component";
import {ReactiveFormsModule} from "@angular/forms";

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
    WidgetComponent

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
    UserModule,
    MatFormFieldModule,
    ReactiveFormsModule


  ],
  providers: [
    CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HeadersInterceptor,
      multi:true
    },
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
