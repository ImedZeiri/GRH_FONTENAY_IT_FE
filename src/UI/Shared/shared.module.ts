import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavigationSidePanelComponent } from './components/navigation-side-panel/navigation-side-panel.component';
import { SingleDoubleClickDirective } from './directives/single-double-click.directive';
import {MatIconModule} from "@angular/material/icon";
import {LayoutModule} from "../Material/Layout/layout.module";
import {NavigationModule} from "../Material/Navigation/navigation.module";
import {CoreModule} from "../../app/core/core.module";
import {PopupsModule} from "../Material/Popups/popups.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {ContentLoaderComponent} from "./components/content-loader/content-loader.component";
import { NotFoundLauncherComponent } from './components/not-found/not-found-launcher/not-found-launcher.component';
import {FooterComponent} from "./components/footer/footer.component";
import {LoadingSpinnerComponent} from "./components/loader/loading-spinner.component";
import { BannedComponent } from './components/banned/banned.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationSidePanelComponent,
    SingleDoubleClickDirective,
    ContentLoaderComponent,
    NotFoundLauncherComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    BannedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    LayoutModule,
    NavigationModule,
    CoreModule,
    PopupsModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports: [
    NavigationBarComponent,
    NavigationSidePanelComponent,
    SingleDoubleClickDirective,
    ContentLoaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
  ]
})
export class SharedModule { }
