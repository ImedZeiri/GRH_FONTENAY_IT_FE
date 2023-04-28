import { Component, HostListener, OnInit } from '@angular/core';
import { AddComponent } from "../add/add.component";
import { MatDialog } from '@angular/material/dialog';
import { ShowComponent } from "../show/show.component";
import { AuthService } from "../../../../core/services/login/auth.service";
import { TaskService } from "../../services/task.service";
import { Task } from '../../services/task';
import {Project} from "../../../project/services/project";
import {ProjectService} from "../../../project/services/project.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  todoList: Task[] = [];
  searchTaskname: string;
  inProgressList: Task[] = [];
  pendingList: Task[] = [];
  blockedList: Task[] = [];
  doneList: Task[] = [];
  tasks: Task[];
  selectedItem: string | null = null;
  isLoading: boolean;
  projects: Project[];
  projectList: { value: string; key: number }[];
  selectedProject: any;


  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private service: TaskService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.authService.startTokenRefreshTimer();
    this.getTasks();
    this.getProjects();
  }

  onDragStart(event: DragEvent, item: string) {
    event.dataTransfer?.setData('text/plain', item);
  }
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
  onDrop(event: DragEvent, newListName: string) {
    event.preventDefault();
    const item = event.dataTransfer?.getData('text/plain');
    if (item) {
      let sourceList: Task[] | undefined;
      let targetList: Task[] | undefined;

      if (this.todoList.find(task => task.name === item)) {
        sourceList = this.todoList as Task[];
      } else if (this.inProgressList.find(task => task.name === item)) {
        sourceList = this.inProgressList as Task[];
      } else if (this.pendingList.find(task => task.name === item)) {
        sourceList = this.pendingList as Task[];
      } else if (this.blockedList.find(task => task.name === item)) {
        sourceList = this.blockedList as Task[];
      } else if (this.doneList.find(task => task.name === item)) {
        sourceList = this.doneList as Task[];
      }

      if (sourceList) {
        switch (newListName) {
          case 'todo':
            targetList = this.todoList as Task[];
            break;
          case 'inProgress':
            targetList = this.inProgressList as Task[];
            break;
          case 'pending':
            targetList = this.pendingList as Task[];
            break;
          case 'blocked':
            targetList = this.blockedList as Task[];
            break;
          case 'done':
            targetList = this.doneList as Task[];
            break;
        }

        if (targetList) {
          const taskToUpdate = sourceList.find(task => task.name === item);
          if (taskToUpdate) {
            const updatedTask = { ...taskToUpdate, state: newListName };
            this.service.updateTask(taskToUpdate.id, updatedTask).subscribe(
              (res) => {
                // Update was successful
                sourceList!.splice(sourceList!.indexOf(taskToUpdate), 1);
                targetList!.push(updatedTask);
                console.log('Target List:', targetList);
                console.log('Source List:', sourceList);
              },
              (error) => {
                console.log(error);
                // Handle error if the update fails
                // You can display an error message or handle it in any other way
              }
            );
          }
        }
      }
    }
  }
  openAddCardDialog(newListName: string): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '400px',
      data: { state: newListName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the form submission result if needed
    });
  }
  selectItem(item: string): void {
    this.selectedItem = item;
  }
  openItemContentDialog(task: Task): void {
    const dialogRef = this.dialog.open(ShowComponent, {
      width: '300px',
      data: { itemContent: task }
    });

    dialogRef.afterClosed().subscribe(() => {
      // Perform any desired actions after the dialog is closed
    });
  }
  getTasks() {
    this.clearTaskLists();
    this.service.getTasks().subscribe(
      (res) => {
        this.tasks = res['hydra:member'];
        this.isLoading = false;

        this.tasks.forEach((task) => {
          switch (task.state) {
            case 'todo':
              this.todoList.push(task);
              break;
            case 'inProgress':
              this.inProgressList.push(task);
              break;
            case 'pending':
              this.pendingList.push(task);
              break;
            case 'blocked':
              this.blockedList.push(task);
              break;
            case 'done':
              this.doneList.push(task);
              break;
            default:
              break;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  searchTasks() {
    const tasksName = this.searchTaskname.toLowerCase();

    // Clear existing task lists
    this.todoList = [];
    this.inProgressList = [];
    this.pendingList = [];
    this.blockedList = [];
    this.doneList = [];

    // Filter tasks based on username
    this.tasks.forEach((task) => {
      if (task['name'].toString().toLowerCase().includes(tasksName)) {
        switch (task.state) {
          case 'todo':
            this.todoList.push(task);
            break;
          case 'inProgress':
            this.inProgressList.push(task);
            break;
          case 'pending':
            this.pendingList.push(task);
            break;
          case 'blocked':
            this.blockedList.push(task);
            break;
          case 'done':
            this.doneList.push(task);
            break;
          default:
            break;
        }
      }
    });
  }
  getProjects() {
    this.projectService.getProjects().subscribe(
      (res) => {
        this.projects = this.mappingProjects(res['hydra:member']);
        this.projectList = this.projects.map((project) => ({ key: project.id, value: project.name }));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mappingProjects(data: any[]) {
    return data.map(item => ({ ...item }));
  }
  filterTasks() {
    console.log('Selected Project:', this.selectedProject);
    let url = '/api/projects/'+this.selectedProject
    if (this.selectedProject === 'all') {
      this.getTasks();
    } else {
      const selectedProjectTasks = this.tasks.filter(task => task['projectId'] === url);
      this.showFilteredTasks(selectedProjectTasks);
    }
  }

  showFilteredTasks(filteredTasks: Task[]) {
    // Clear existing task lists
    this.clearTaskLists();

    // Show filtered tasks
    filteredTasks.forEach((task) => {
      switch (task.state) {
        case 'todo':
          this.todoList.push(task);
          break;
        case 'inProgress':
          this.inProgressList.push(task);
          break;
        case 'pending':
          this.pendingList.push(task);
          break;
        case 'blocked':
          this.blockedList.push(task);
          break;
        case 'done':
          this.doneList.push(task);
          break;
        default:
          break;
      }
    });
  }
  clearTaskLists() {
    // Clear existing task lists
    this.todoList = [];
    this.inProgressList = [];
    this.pendingList = [];
    this.blockedList = [];
    this.doneList = [];
  }
}
