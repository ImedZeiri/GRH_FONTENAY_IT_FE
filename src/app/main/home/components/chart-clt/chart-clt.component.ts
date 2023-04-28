import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StatisticsService } from "../../services/statistics.service";
declare var google: any;

@Component({
  selector: 'app-chart-clt',
  templateUrl: './chart-clt.component.html',
  styleUrls: ['./chart-clt.component.css']
})
export class ChartCLTComponent implements OnInit, AfterViewInit {
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart(): void {
    const usersCount = this.statisticsService.getUsersCount();
    const companyTasksCount = this.statisticsService.getCompanyTasksCount();
    const projectsCount = this.statisticsService.getProjectsCount();

    const data = google.visualization.arrayToDataTable([
      ['Category', 'Count', { role: 'style' }],
      ['Users', usersCount, '#4dbfe0'],
      ['Company', companyTasksCount, 'rgb(163,199,214)'],
      ['Task', companyTasksCount, '#a6bb8d'],
      ['Projects', projectsCount, '#6a9f85']
    ]);

    const options = {
      title: 'Chart Title',
      hAxis: {
        title: 'Categories'
      },
      vAxis: {
        title: 'Count'
      },
      legend: { position: 'none' }
    };

    const chart = new google.visualization.BarChart(document.getElementById('chartContainer'));
    chart.draw(data, options);
  }
}
