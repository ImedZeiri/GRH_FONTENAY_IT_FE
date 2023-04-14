import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  private service: UsersService;
  user: any;
  EditUserForm: FormGroup;
  toppingList: string[] = ['Info','RH','security','Other'];


  constructor() { }

  ngOnInit(): void {
  }
  onUpdateUser(user: any) {
    this.service.updateUser(user.id , user).subscribe(() => {
      console.log('Utilisateur mis à jour avec succès');
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    });
  }


}
