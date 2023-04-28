import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TaskService } from "../../services/task.service";
import { Task } from "../../services/task";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddComponent>,
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.formBuilder.group({
      project_id: ['', Validators.required],
      task_skill_id: ['', Validators.required],
      member_id: ['', Validators.required],
      name: ['', Validators.required],
      start_at: ['', Validators.required],
      end_at: ['', Validators.required],
      complexity: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.taskForm.valid && this.taskForm.get('start_at')?.value !== null) {
      const newTask = {
        project_id: this.taskForm.get('project_id')?.value,
        task_skill_id: this.taskForm.get('task_skill_id')?.value,
        member_id: this.taskForm.get('member_id')?.value,
        name: this.taskForm.get('name')?.value,
        start_at: this.taskForm.get('start_at')?.value,
        end_at: this.taskForm.get('end_at')?.value,
        complexity: +this.taskForm.get('complexity')?.value,
        state: this.taskForm.get('state')?.value
      } as Task;

      this.taskService.addTask(newTask).subscribe(
        () => {
          // Handle success, e.g., display a success message
          this.dialogRef.close();
        },
        (error) => {
          // Handle error, e.g., display an error message
        }
      );
    }
  }
}
