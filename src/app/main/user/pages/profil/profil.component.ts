import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from "../../services/users";
import { UsersService } from "../../services/users.service";
import * as QRCode from 'qrcode'; // Importez le module qrcode

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  users: any;
  currentUser: any;
  qrCodeValue: string; // Valeur du QR code

  constructor(private service: UsersService) { }

  getConnectedUser() {
    this.service.getUsers().subscribe((res) => {
      this.users = res['hydra:member'];
      this.users = this.mappingUsers(res['hydra:member']);
      this.currentUser = this.users.find(user => user.username === localStorage.getItem('username'));
      this.generateQRCode(); // Appelez la méthode pour générer le QR code
    }, error => {
      console.log(error);
    });
    return this.currentUser;
  }

  mappingUsers(data: any[]) {
    let newUsers = data.map(item => {
      return {
        ...item
      }
    })
    return newUsers
  }

  generateQRCode() {
    const data = `Email: ${this.currentUser.email}, Password: ${this.currentUser.password}`;

    QRCode.toDataURL(data, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      this.qrCodeValue = url;
    });
  }

  ngOnInit(): void {
    this.getConnectedUser()
  }
}
