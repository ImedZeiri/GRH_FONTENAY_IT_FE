import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectService } from "../../../project/services/project.service";
import { Project } from "../../../project/services/project";
import { TaskService } from "../../services/task.service";
import { Task } from "../../services/task";

declare const google: any;

@Component({
  selector: 'app-chart-task4',
  templateUrl: './chart-task4.component.html',
  styleUrls: ['./chart-task4.component.css']
})
export class ChartTask4Component implements OnInit, AfterViewInit {
  projects: Project[];
  projectTasks: { projectId: number, taskCount: number }[];

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) { }

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
        this.calculateTaskCounts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calculateTaskCounts() {
    this.projectTasks = [];

    this.projects.forEach((project) => {
      const projectTaskCount = project.tasks.length;
      this.projectTasks.push({ projectId: project.id, taskCount: projectTaskCount });
    });

    this.drawChart();
  }

  drawChart(): void {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Project');
    data.addColumn('number', 'Task Count');

    this.projectTasks.forEach((projectTask) => {
      const project = this.projects.find(p => p.id === projectTask.projectId);
      if (project) {
        data.addRow([project.name, projectTask.taskCount]);
      }
    });

    const options = {
      title: 'Task Count per Project',
      curveType: 'function',
      legend: { position: 'bottom' },
      backgroundColor: 'transparent',
      chartArea: { backgroundColor: 'transparent' },
      hAxis: { title: 'Project' },
      vAxis: { title: 'Task Count' }
    };

    const chart = new google.visualization.LineChart(document.getElementById('chartContainer4'));
    chart.draw(data, options);
  }
}
