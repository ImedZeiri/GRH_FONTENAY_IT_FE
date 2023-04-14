import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  private service: CompanyService;
  user: any;
  EditUserForm: FormGroup;
  toppingList: string[] = ['Info','RH','security','Other'];


  constructor() { }

  ngOnInit(): void {
  }
  onUpdateCompany(company: any) {
    this.service.updateCompany(company.id , company).subscribe(() => {
      console.log('Company mis à jour avec succès');
    }, error => {
      console.error('Erreur lors de la mise à jour du Company', error);
    });
  }


}
