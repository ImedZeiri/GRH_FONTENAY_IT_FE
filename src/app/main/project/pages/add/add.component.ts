import {Component, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  constructor() {}

  ngOnInit(): void {
  }

  onSubmitForm() {
    if (this.stepper.selectedIndex < this.stepper.steps.length - 1) {
      this.stepper.next();
    } else {
      // Toutes les étapes sont terminées, gérer la soumission finale ici
    }
  }
}
