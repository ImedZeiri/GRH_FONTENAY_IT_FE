import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
declare const google: any;
import { Task } from "../../services/task";

@Component({
  selector: 'app-chart-task1',
  templateUrl: './chart-task1.component.html',
  styleUrls: ['./chart-task1.component.css']
})
export class ChartTask1Component implements OnInit, AfterViewInit {
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
    const dataAdmin = google.visualization.arrayToDataTable([
      ['Category', 'Count', { role: 'style' }],
      ['Blocked', this.blockedList, '#b6e04d'],
      ['Todo', this.todoList, '#4dc5e0'],
      ['Done', this.doneList, '#e04d63'],
      ['Pending', this.pendingList, '#4d88e0'],
      ['In Progress', this.inProgressList, '#6a9f85'],
    ]);

    const options1 = {
      title: 'Tasks States',
      pieHole: 0.4,
      backgroundColor: 'transparent',
      chartArea: {
        backgroundColor: 'transparent'
      },
      slices: {
        0: { color: '#6a9f85' },
        1: { color: '#4dbfe0' },
      }
    };

    const chart = new google.visualization.PieChart(document.getElementById('chartContainer1'));
    chart.draw(dataAdmin, options1);
  }
}
