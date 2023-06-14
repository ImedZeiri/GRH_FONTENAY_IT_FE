import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TaskService } from "../../services/task.service";
import { Task } from "../../services/task";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProjectService} from "../../../project/services/project.service";
import {ProjectDataService} from "../../../project/services/project-data.service";
import {Project} from "../../../project/services/project";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  AddTaskForm: FormGroup;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Input() projectId: number;
  tasks: any[] = [];
  project: any;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: TaskService,
    private projectService: ProjectService,
    private projectDataService: ProjectDataService,
  ) {
    this.AddTaskForm = this.formBuilder.group({
      name: ['', Validators.required],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required],
      complexity: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.setProjectId();
  }

  setProjectId() {
    this.projectId = this.projectDataService.getProjectId();
    this.projectService.getProject(this.projectId).subscribe(
      response => {
        this.project = response;
      },
      error => {
        console.error(error);
        this.openSnackBar('Error occurred', '');
      }
    );
    console.log(this.project);
  }

  onSubmit() {
    if (this.AddTaskForm.invalid) {
      Object.keys(this.AddTaskForm.controls).forEach(controlName => {
        this.AddTaskForm.controls[controlName].markAsTouched();
      });
      return;
    }

    const task = this.AddTaskForm.value;
    this.service.addTask(task).subscribe(
      response => {
        console.log(response);
        this.openSnackBar('Task created', '');
        this.tasks.push('/api/tasks/'+response['id']);
        this.updateProjectTasks(this.tasks); // Update the project with the task IDs
        this.formSubmitted.emit();
        this.AddTaskForm.reset(); // Reset the form
      },
      error => {
        console.error(error);
        this.openSnackBar('Error occurred', '');
      }
    );
    console.log(this.tasks);
  }

  addOtherTask() {
    if (this.AddTaskForm.invalid) {
      Object.keys(this.AddTaskForm.controls).forEach(controlName => {
        this.AddTaskForm.controls[controlName].markAsTouched();
      });
      return;
    }

    const task = this.AddTaskForm.value;
    this.service.addTask(task).subscribe(
      response => {
        console.log(response);
        this.openSnackBar('Task created', '');
        this.tasks.push('/api/tasks/'+response['id']); // Add the created task ID to the tasks array
        this.AddTaskForm.reset(); // Reset the form
      },
      error => {
        console.error(error);
        this.openSnackBar('Error occurred', '');
      }
    );
  }

  updateProjectTasks(taskIds: string[]) {
    taskIds.forEach((taskId: string) => {
      this.project.tasks.push(taskId);
    });

    const updatedProject: Project = {
      ...this.project,
      tasks: this.project.tasks
    };

    this.projectService.updateProject(this.projectId, updatedProject).subscribe(
      response => {
        console.log(response);
        this.openSnackBar('Tasks added to project', '');
      },
      error => {
        console.error(error);
        this.openSnackBar('Error occurred', '');
      }
    );
  }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
