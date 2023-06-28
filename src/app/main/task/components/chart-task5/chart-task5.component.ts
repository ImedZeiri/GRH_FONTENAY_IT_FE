import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectService } from "../../../project/services/project.service";
import { Project } from "../../../project/services/project";

declare const google: any;

@Component({
  selector: 'app-chart-task5',
  templateUrl: './chart-task5.component.html',
  styleUrls: ['./chart-task5.component.css']
})
export class ChartTask5Component implements OnInit, AfterViewInit {
  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      (res) => {
        this.projects = res['hydra:member'];
        this.drawChart();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  drawChart(): void {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Project');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');

    this.projects.forEach((project) => {
      const startDate = new Date(project.startAt);
      const endDate = new Date(project.endAt);
      data.addRow([project.name, startDate, endDate]);
    });

    const options = {
      title: 'Project Durations',
      chartArea: { backgroundColor: 'transparent' },
      hAxis: { title: 'Project', titleTextStyle: { italic: false } },
      vAxis: { title: 'Duration', format: 'MMM yyyy' },
      backgroundColor: 'transparent',
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('chartContainer5'));
    chart.draw(data, options);
  }
}
