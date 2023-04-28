import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  steps: string[] = ['Create Project', 'Create Tasks', 'Hire'];
  currentStepIndex: number = 0;
  stepFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.stepFormGroup = this.formBuilder.group({
      projectDetails: ['', Validators.required],
      taskDetails: ['', Validators.required],
      hireDetails: ['', Validators.required]
    });
  }

  nextStep(): void {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
    }
  }

  previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }
}
