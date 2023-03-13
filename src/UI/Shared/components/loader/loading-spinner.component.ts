import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loading">
      <div class="spinner-wrapper">
        <span class="spinner-text">Loading</span>
        <span class="spinner"></span>
      </div>
    </div>
  `,
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {}
