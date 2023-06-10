import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from "../../../services/project.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProjectDataService } from "../../../services/project-data.service";

@Component({
  selector: 'app-step-project',
  templateUrl: './step-project.component.html',
  styleUrls: ['./step-project.component.css']
})
export class StepProjectComponent implements OnInit {
  public breakpoint: number;
  AddProjectForm: FormGroup;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: ProjectService,
    private projectDataService: ProjectDataService
  ) {
    this.AddProjectForm = this.formBuilder.group({
      owner: ['', Validators.required],
      client: ['', Validators.required],
      name: ['', Validators.required],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required],
      field: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
    const ownerId = localStorage.getItem('id');
    if (ownerId) {
      this.AddProjectForm.get('owner')?.setValue('/api/users/' + ownerId);
    }
  }

  onSubmit() {
    if (this.AddProjectForm.invalid) {
      Object.keys(this.AddProjectForm.controls).forEach(controlName => {
        this.AddProjectForm.controls[controlName].markAsTouched();
      });
      return;
    }

    this.service.addProject(this.AddProjectForm.value).subscribe(
      response => {
        console.log(response);
        const createdProjectId = response['id'];
        console.log(createdProjectId);
        if (createdProjectId) {
          this.projectDataService.setProjectId(createdProjectId); // Store the project ID in the service
        }
        this.openSnackBar('Project created', '');
        this.formSubmitted.emit();
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
