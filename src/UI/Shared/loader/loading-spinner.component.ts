import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: ` <div class='loader loader3'>
    <div class='spinner'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <svg>
      <defs>
        <filter id='goo'>
          <feGaussianBlur in='SourceGraphic' stdDeviation='8' result='blur' />
          <feColorMatrix in='blur' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 50 -8' result='goo' />
          <feBlend in='SourceGraphic' in2='goo' />
        </filter>
      </defs>
    </svg>
  </div>
  `,
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {}
