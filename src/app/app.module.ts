import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login.component';
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
import {FormsModule} from "../UI/Material/Forms/forms.module";
import {FooterComponent} from '../UI/Shared/footer/footer.component'
import {ToolbarComponent} from "../UI/Shared/toolbar/toolbar.component";
import {AccessDeniedComponent} from "../UI/Shared/access-denied/access-denied.component";
import {NotFoundComponent} from "../UI/Shared/not-found/not-found.component";
import {InterceptorInterceptor} from "./core/interceptors/interceptor.interceptor";
import { UsersComponent } from './users/users/users.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserShowComponent } from './users/user-show/user-show.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    BodyComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    ToolbarComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    UsersComponent,
    UserAddComponent,
    UserEditComponent,
    UserShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  providers: [
    CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorInterceptor,
      multi:true
    },

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
