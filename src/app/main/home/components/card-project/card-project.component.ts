import { Component, Input, OnInit } from '@angular/core';
import { Project } from "../../../project/services/project";
import { TaskService } from "../../../task/services/task.service";
import { Task } from "../../../task/services/task";
import {Observable} from "rxjs";
declare const google: any;

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.css']
})
export class CardProjectComponent implements OnInit {
  @Input() project: Project;
  tasks: Task[];
  taskIds: string[];
  todoList: number = 0;
  inProgressList: number = 0;
  pendingList: number = 0;
  blockedList: number = 0;
  doneList: number = 0;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getProjectTasks();
  }

  getProjectTasks() {
    this.taskIds = this.extractTaskIdsFromUrls(this.project['tasks']);
    this.tasks = [];

    this.taskIds.forEach(taskId => {
      this.getTaskById(taskId).subscribe((response: any) => {
        this.tasks.push(response);
        console.log('Task:', response); // Display the task in the console

        this.getStateCounts();
        this.drawChart();
      });
    });
  }

  getTaskById(taskId: string): Observable<Task[]> {
    return this.taskService.getTask(Number(taskId));
  }

  extractTaskIdsFromUrls(taskUrls: string[]): string[] {
    return taskUrls.map(url => {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    });
  }

  getStateCounts(): void {
    this.blockedList = this.tasks.filter(task => task.state === 'blocked').length;
    this.todoList = this.tasks.filter(task => task.state === 'todo').length;
    this.doneList = this.tasks.filter(task => task.state === 'done').length;
    this.pendingList = this.tasks.filter(task => task.state === 'pending').length;
    this.inProgressList = this.tasks.filter(task => task.state === 'inProgress').length;
    this.drawChart();
  }

  drawChart(): void {
    const data = google.visualization.arrayToDataTable([
      ['Category', 'Count', { role: 'style' }],
      ['Blocked', this.blockedList, '#b6e04d'],
      ['Todo', this.todoList, '#4dc5e0'],
      ['Done', this.doneList, '#e04d63'],
      ['Pending', this.pendingList, '#4d88e0'],
      ['In Progress', this.inProgressList, '#6a9f85'],
    ]);

    const options = {
      title: 'Tasks States: '+this.project.name,
      legend: { position: 'right' },
      backgroundColor: 'white',
      chartArea: {
        backgroundColor: 'transparent'
      },
      slices: {
        0: { color: '#86041d' },
        1: { color: '#4dbfe0' },
      }
    };

    const chart = new google.visualization.PieChart(document.getElementById('chartContainerHP'+this.project.id));
    chart.draw(data, options);
  }
}
