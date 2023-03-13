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

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationSidePanelComponent,
    SingleDoubleClickDirective
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
    FormsModule
  ],
  exports: [
    NavigationBarComponent,
    NavigationSidePanelComponent,
    SingleDoubleClickDirective
  ]
})
export class SharedModule { }
