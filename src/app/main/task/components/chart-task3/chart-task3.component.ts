import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
declare const google: any;
import { Task } from "../../services/task";

@Component({
  selector: 'app-chart-task3',
  templateUrl: './chart-task3.component.html',
  styleUrls: ['./chart-task3.component.css']
})
export class ChartTask3Component implements OnInit, AfterViewInit {
  tasks: Task[];
  complexityData: any[] = [];

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  getTasks() {
    this.service.getTasks().subscribe((res) => {
      this.tasks = res['hydra:member'];
      this.tasks = this.mappingTasks(res['hydra:member']);
      this.calculateComplexityData();
      this.drawChart();
    });
  }

  mappingTasks(data: any[]) {
    let newTasks = data.map(item => {
      return {
        ...item
      };
    });
    return newTasks;
  }

  calculateComplexityData() {
    const complexityCounts: any = {};

    this.tasks.forEach(task => {
      const complexity = task['complexity'];
      if (complexityCounts[complexity]) {
        complexityCounts[complexity]++;
      } else {
        complexityCounts[complexity] = 1;
      }
    });

    this.complexityData = Object.entries(complexityCounts).map(([complexity, count]) => [complexity, count]);
  }

  drawChart(): void {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Complexity');
    data.addColumn('number', 'Count');
    data.addRows(this.complexityData);

    const options = {
      title: 'Task Complexity',
      backgroundColor: 'transparent',
      chartArea: {
        backgroundColor: 'transparent'
      }
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('chartContainer3'));
    chart.draw(data, options);
  }
}
