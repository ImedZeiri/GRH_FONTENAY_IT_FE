import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SideNavComponent} from "../UI/Shared/components/side-nav/side-nav.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavigationModule} from "../UI/Material/Navigation/navigation.module";
import {MatSelectModule} from "@angular/material/select";
import {ButtonsModule} from "../UI/Material/Buttons/buttons.module";
import {LayoutModule} from "../UI/Material/Layout/layout.module";
import {DatatableModule} from "../UI/Material/DataTables/datatable.module";
import {PopupsModule} from "../UI/Material/Popups/popups.module";
import {TokenInterceptorService} from "../../src/app/core/services/login/token-interceptor.service";
import {CookieService} from 'ngx-cookie-service';
import {LoadingSpinnerComponent} from "../UI/Shared/components/loader/loading-spinner.component";
import {FormsModule} from "../UI/Material/Forms/forms.module";
import {FooterComponent} from '../UI/Shared/components/footer/footer.component'
import {ToolbarComponent} from "../UI/Shared/components/toolbar/toolbar.component";
import {AccessDeniedComponent} from "../UI/Shared/components/access-denied/access-denied.component";
import {NotFoundComponent} from "../UI/Shared/components/not-found/not-found.component";
import {InterceptorInterceptor} from "../../src/app/core/interceptors/interceptor.interceptor";


import { CoreModule } from './core/core.module';
import { SharedModule } from '../UI/Shared/shared.module';

import { AccountInfoComponent } from './pages/account-info.component';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './pages/home.component';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    ToolbarComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    AppComponent,
    HomeComponent,
    DashboardComponent,
    AccountInfoComponent,
    FooterComponent
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
    SharedModule

  ],
  providers: [
    CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }

  ],

  bootstrap: [AppComponent]
})
export class AppModule {

}
