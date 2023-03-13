import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SidePanelService } from './layouts/dashboard-layout/services/side-panel.service';
import { FirstLetterPipe } from './pipes/firstLetterPipe/first-letter.pipe';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    FirstLetterPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    SidePanelService
  ],
    exports: [
        DashboardLayoutComponent,
        FirstLetterPipe
    ]
})
export class CoreModule { }
