import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {CoreModule} from "../../core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PortalModule} from "@angular/cdk/portal";
import {CookieService} from "ngx-cookie-service";
import {HeadersInterceptor} from "../../core/interceptors/headers.interceptor";
import {SharedModule} from "../../../UI/Shared/shared.module";
import {AddComponent} from "./pages/add/add.component";
import {EditComponent} from "./pages/edit/edit.component";
import {ListComponent} from "./pages/list/list.component";
import {ShowComponent} from "./pages/show/show.component";
import {TaskRoutingModule} from "./task-routing.module";
import {LayoutModule} from "../../../UI/Material/Layout/layout.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {DepartmentRoutingModule} from "../department/department-routing.module";
import {NavigationModule} from "../../../UI/Material/Navigation/navigation.module";
import {MatSelectModule} from "@angular/material/select";
import {ButtonsModule} from "../../../UI/Material/Buttons/buttons.module";
import {DatatableModule} from "../../../UI/Material/DataTables/datatable.module";
import {PopupsModule} from "../../../UI/Material/Popups/popups.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {CompanyModule} from "../company/company.module";
import { StatComponent } from './pages/stat/stat.component';
import { ChartTask1Component } from './components/chart-task1/chart-task1.component';
import { ChartTask2Component } from './components/chart-task2/chart-task2.component';
import { ChartTask3Component } from './components/chart-task3/chart-task3.component';
import { ChartTask4Component } from './components/chart-task4/chart-task4.component';
import { ChartTask5Component } from './components/chart-task5/chart-task5.component';
import { ChartTask6Component } from './components/chart-task6/chart-task6.component';

@NgModule({
    declarations: [
        AddComponent,
        EditComponent,
        ListComponent,
        ShowComponent,
        StatComponent,
        ChartTask1Component,
        ChartTask2Component,
        ChartTask3Component,
        ChartTask4Component,
        ChartTask5Component,
        ChartTask6Component,
    ],
    imports: [
        CommonModule,
        TaskRoutingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        BrowserModule,
        CoreModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        PortalModule,
        MatCheckboxModule,
        AppRoutingModule,
        SharedModule,
        LayoutModule,
        MatDialogModule,
        MatInputModule,


        CommonModule,
        DepartmentRoutingModule,
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
        MatSelectModule,
        PortalModule,
        MatCheckboxModule,
        MatDatepickerModule,
        AppRoutingModule,
        FormsModule,
        CompanyModule,
        SharedModule,
    ],
    exports: [
        ChartTask6Component
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
export class TaskModule { }
