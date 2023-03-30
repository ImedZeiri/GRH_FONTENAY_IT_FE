import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
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
import {FormsModule} from "../../../UI/Material/Forms/forms.module";
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../../UI/Shared/shared.module";
import {ContentLoaderComponent} from "../../../UI/Shared/components/content-loader/content-loader.component";
import {WidgetComponent} from "./components/widget/widget.component";


@NgModule({
  declarations: [
    ContentLoaderComponent,
    WidgetComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
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
  ]
})
export class HomeModule { }
