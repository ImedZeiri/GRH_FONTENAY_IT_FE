import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  @Input() name = 'fas fa-list';
  @Input() value = '';
  @Input() label = 'Statistique';
  constructor() { }

  ngOnInit(): void {
  }

}
