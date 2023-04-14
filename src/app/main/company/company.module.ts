import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
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
import {WidgetComponent} from "./components/widget/widget.component";
import { CustomCardComponent } from './components/custom-card/custom-card.component';
import {CookieService} from "ngx-cookie-service";
import {AddComponent} from "./pages/add/add.component";
import {EditComponent} from "./pages/edit/edit.component";
import {ShowComponent} from "./pages/show/show.component";
import {ListComponent} from "./pages/list/list.component";
import {SharedModule} from "../../../UI/Shared/shared.module";
import { GeoCardComponent } from './components/geo-card/geo-card.component';
import { ChartLoaderComponent } from './components/chart-loader/chart-loader.component';
import { ChartComponent } from './components/chart/chart.component';
import { ListAssociateComponent } from './components/list-associate/list-associate.component';
import {HeadersInterceptor} from "../../core/interceptors/headers.interceptor";
import {FormsModule} from "../../../UI/Material/Forms/forms.module";



@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ShowComponent,
    ListComponent,
    WidgetComponent,
    CustomCardComponent,
    GeoCardComponent,
    ChartLoaderComponent,
    ChartComponent,
    ListAssociateComponent,

  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
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
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    AppRoutingModule,
    SharedModule,
    ButtonsModule,
  ],
  exports: [
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
  ]
})
export class CompanyModule { }
