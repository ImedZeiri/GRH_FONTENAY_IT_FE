import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
declare const google: any;
import { Task } from "../../services/task";

@Component({
  selector: 'app-chart-task2',
  templateUrl: './chart-task2.component.html',
  styleUrls: ['./chart-task2.component.css']
})
export class ChartTask2Component implements OnInit, AfterViewInit {
  tasks: Task[];
  todoList: number = 0;
  inProgressList: number = 0;
  pendingList: number = 0;
  blockedList: number = 0;
  doneList: number = 0;

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
    this.countTasks();
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  getTasks() {
    this.service.getTasks().subscribe((res) => {
      this.tasks = res['hydra:member'];
      this.tasks = this.mappingTasks(res['hydra:member']);
      this.countTasks();
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

  countTasks() {
    this.blockedList = this.tasks.filter(task => task['state'] === 'blocked').length;
    this.todoList = this.tasks.filter(task => task['state'] === 'todo').length;
    this.doneList = this.tasks.filter(task => task['state'] === 'done').length;
    this.pendingList = this.tasks.filter(task => task['state'] === 'pending').length;
    this.inProgressList = this.tasks.filter(task => task['state'] === 'inProgress').length;
    this.drawChart();
  }

  drawChart(): void {
    const data = google.visualization.arrayToDataTable([
      ['Category', 'Count'],
      ['Blocked', this.blockedList],
      ['Todo', this.todoList],
      ['Done', this.doneList],
      ['Pending', this.pendingList],
      ['In Progress', this.inProgressList],
    ]);

    const options = {
      title: 'Tasks States',
      legend: { position: 'none' },
      backgroundColor: 'transparent',
      chartArea: {
        backgroundColor: 'transparent'
      },
      bars: 'vertical',
      vAxis: {
        minValue: 0
      }
    };

    const chart = new google.visualization.BarChart(document.getElementById('chartContainer2'));
    chart.draw(data, options);
  }
}
