import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UsersComponent} from "./pages/users/users.component";
import {UserAddComponent} from "./pages/user-add/user-add.component";
import {UserShowComponent} from "./pages/user-show/user-show.component";
import {UserEditComponent} from "./pages/user-edit/user-edit.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NavigationModule} from "../../../UI/Material/Navigation/navigation.module";
import {MatSelectModule} from "@angular/material/select";
import {ButtonsModule} from "../../../UI/Material/Buttons/buttons.module";
import {LayoutModule} from "../../../UI/Material/Layout/layout.module";
import {DatatableModule} from "../../../UI/Material/DataTables/datatable.module";
import {PopupsModule} from "../../../UI/Material/Popups/popups.module";
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../../UI/Shared/shared.module";
import {ContentLoaderComponent} from "../../../UI/Shared/components/content-loader/content-loader.component";
import {WidgetComponent} from "../home/components/widget/widget.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";


@NgModule({
  declarations: [
    UsersComponent,
    UserAddComponent,
    UserShowComponent,
    UserEditComponent,
    ContentLoaderComponent,
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
    FormsModule,
    CoreModule,
    SharedModule,
    FormsModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatRadioModule,
  ]
})
export class UserModule { }
