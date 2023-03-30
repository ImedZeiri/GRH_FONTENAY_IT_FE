import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  @Input() background = 'linear-gradient(to right, #ff5f6d, #ffc371)';
  @Input() iconClass = 'fas fa-users';
  @Input() value = '';
  @Input() label = 'Statistique';
  animationPlayed: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    if (!localStorage.getItem('animationPlayed')){
      const element = document.querySelector('.widget') as HTMLElement;
      element.style['animation-play-state'] = 'paused';
      localStorage.setItem('animationPlayed', 'true');
    }
  }
  }
