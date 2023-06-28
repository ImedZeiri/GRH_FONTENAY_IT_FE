import { Component, OnInit } from '@angular/core';
import { Project } from "../../../project/services/project";
import { ProjectService } from "../../../project/services/project.service";
declare const google: any;

@Component({
  selector: 'app-chart-double',
  templateUrl: './chart-double.component.html',
  styleUrls: ['./chart-double.component.css']
})
export class ChartDoubleComponent implements OnInit {
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
      colors: ['#3a98b9', '#edf1d6'], // Modifier les couleurs ici
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('chartContainer5'));
    chart.draw(data, options);
  }
}
