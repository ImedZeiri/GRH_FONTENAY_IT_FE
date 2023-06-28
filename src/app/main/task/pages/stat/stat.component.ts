import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  chartsLoaded: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loadCharts();
  }

  loadCharts(): void {
    // Simulating chart loading delay
    setTimeout(() => {
      this.chartsLoaded = true;
    }, 2000); // Adjust the delay as needed
  }
}
