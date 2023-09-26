import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { NgForm } from '@angular/forms';
import { DbService } from '../services/db.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  successful: boolean = false;

  constructor(private db: DbService /*private localStorageService: LocalStorageService*/) { }

  ngOnInit(): void { }

  register(data: NgForm) {
    const encryptedPassword = CryptoJS.SHA256(this.password).toString();
    data.value.password = encryptedPassword;
    
    this.db.table('usuarios').add({...data.value, session: false});

    console.log(data.value)
    console.log(encryptedPassword)

    this.name = '';
    this.email = '';
    this.password = '';
    this.successful = true;   
  }
}

// Var -> Declaración, se puede acceder desde cualquier función en cualquier lugar,tiene  todas las instancias del scope.
// let -> Declaración, NO se puede acceder desde cualquier función en cualquier lugar SOLO está implicita al método al que pertenece.
// this -> accede a una variable que es de la clase
// const -> Es inmutable, no permite cambiar el valor.