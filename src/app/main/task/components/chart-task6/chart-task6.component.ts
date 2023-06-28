import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectService } from "../../../project/services/project.service";
import { Project } from "../../../project/services/project";

declare const google: any;

@Component({
  selector: 'app-chart-task6',
  templateUrl: './chart-task6.component.html',
  styleUrls: ['./chart-task6.component.css']
})
export class ChartTask6Component implements OnInit, AfterViewInit {
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
    data.addColumn('string', 'Field');
    data.addColumn('number', 'Task Count');

    this.projects.forEach((project) => {
      const taskCount = project.tasks.length;
      data.addRow([project.field, taskCount]);
    });

    const options = {
      title: 'Project Fields - Task Count',
      pieHole: 0.4,
      backgroundColor: 'transparent',
      chartArea: { backgroundColor: 'transparent' },
    };

    const chart = new google.visualization.PieChart(document.getElementById('chartContainer6'));
    chart.draw(data, options);
  }
}
