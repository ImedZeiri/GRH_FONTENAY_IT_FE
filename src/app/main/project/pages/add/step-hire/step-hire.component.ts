import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-hire',
  templateUrl: './step-hire.component.html',
  styleUrls: ['./step-hire.component.css']
})
export class StepHireComponent implements OnInit {
  AddHireForm: FormGroup;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {
    this.AddHireForm = this.formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.AddHireForm.invalid) {
      Object.keys(this.AddHireForm.controls).forEach(controlName => {
        this.AddHireForm.controls[controlName].markAsTouched();
      });
      return;
    }

    // Your hire submission logic here

    this.formSubmitted.emit();
  }
}
