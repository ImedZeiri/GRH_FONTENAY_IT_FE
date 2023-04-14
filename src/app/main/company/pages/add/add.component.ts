import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanyService} from "../../services/company.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  toppingList: string[] = ['Info','RH','security','Other'];
  public breakpoint: number;
  public name: string = ``;

  AddCompanyForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private service:CompanyService)
  {
      this.AddCompanyForm = this.formBuilder.group({
        name: ['', Validators.required],
        location: [''],
        email: ['', Validators.email],
        phone: [''],
        category: [''],
        website: [''],
        capacity: [null, Validators.min(1)],
        deleted_file_expiration: ['2023-01-24T00:00:00+00:00', Validators.required],
        taxNumber: [null, Validators.min(1)],
        identityNumber: [null, Validators.min(1)],
    });
  }
  ngOnInit(): void {
    this.AddCompanyForm = this.formBuilder.group({
      name: [this.name, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      location: [''],
      email: ['', Validators.email],
      phone: [''],
      category: [''],
      website: [''],
      capacity: [null, Validators.min(1)],
      deleted_file_expiration: ['', Validators.required],
      taxNumber: [null, Validators.min(1)],
      identityNumber: [null, Validators.min(1)],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
  }
  onSubmit(AddCompanyForm: FormGroup) {
    console.log(this.AddCompanyForm.value);
    this.service.addCompany(AddCompanyForm.value).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }


}
