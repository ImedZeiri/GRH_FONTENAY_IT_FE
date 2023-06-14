import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UsersComponent} from "./pages/users/users.component";
import {UserAddComponent} from "./pages/user-add/user-add.component";
import {UserShowComponent} from "./pages/user-show/user-show.component";
import {UserEditComponent} from "./pages/user-edit/user-edit.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NavigationModule} from "../../../UI/Material/Navigation/navigation.module";
import {MatSelectModule} from "@angular/material/select";
import {ButtonsModule} from "../../../UI/Material/Buttons/buttons.module";
import {LayoutModule} from "../../../UI/Material/Layout/layout.module";
import {DatatableModule} from "../../../UI/Material/DataTables/datatable.module";
import {PopupsModule} from "../../../UI/Material/Popups/popups.module";
import {CoreModule} from "../../core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PortalModule} from "@angular/cdk/portal";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {WidgetComponent} from "./components/widget/widget.component";
import { CustomCardComponent } from './components/custom-card/custom-card.component';
import {CookieService} from "ngx-cookie-service";
import {HeadersInterceptor} from "../../core/interceptors/headers.interceptor";
import {CompanyModule} from "../company/company.module";
import {SharedModule} from "../../../UI/Shared/shared.module";
import { ProfilComponent } from './pages/profil/profil.component';
import {CapitalizePipe} from "../../core/pipes/capitalize.pipe";
import {KeysPipe} from "../../core/pipes/key.pipe";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { Chart1Component } from './components/chart1/chart1.component';
import { QrCodeDialogComponent } from './components/qr-code-dialog/qr-code-dialog.component';




@NgModule({
  declarations: [
    UsersComponent,
    UserAddComponent,
    UserShowComponent,
    UserEditComponent,
    WidgetComponent,
    CustomCardComponent,
    ProfilComponent,
    CapitalizePipe,
    KeysPipe,
    Chart1Component,
    QrCodeDialogComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    CoreModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    PortalModule,
    MatCheckboxModule,
    MatDatepickerModule,
    AppRoutingModule,
    FormsModule,
    CompanyModule,
    SharedModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  providers: [
    CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HeadersInterceptor,
      multi:true
    },
  ]
})
export class UserModule { }
