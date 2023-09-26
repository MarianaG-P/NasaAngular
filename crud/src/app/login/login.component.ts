import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string = '';
  password: string = '';

  constructor(
    private authService:AuthService,
    private router: Router) {    
  }

  ngOnInit(): void {
  }

  async login(data: NgForm){
    const  user = await this.authService.getlogin(data);
    console.log(user)

    if(user){
      console.log('Ingreso exitoso')
      this.router.navigate(['/home']);
    }else{
      console.log('Ingreso NO exitoso')
    }
    
  }
  /*
  ----- Implementacion con localStorage --------------------------
  constructor(private db: DbService, private router: Router) { }
  
  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  async login(data: NgForm) { //función que va a devolver una promesa
    console.log(data.value.name)
    const name = data.value.name
    const password = data.value.password
    const encryptedPassword = CryptoJS.SHA256(password).toString()
    console.log(data.value.password)
    console.log(encryptedPassword)
    try {
      // Realiza una consulta a la base de datos utilizando Dexie.js
      const userData = await this.db.table('usuarios')
        .filter(user => user.name === name && user.password === encryptedPassword)
        .toArray();

      if (userData && userData.length > 0) {
        console.log('Usuario encontrado:', userData[0]);
        this.router.navigate(['/home']);
      } else {
        console.log('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al acceder a la base de datos:', error);
    }
  }
  login(): void{
    const storedUserData = this.localStorageService.getData('userData');

    if (storedUserData && storedUserData.email === this.email && storedUserData.password === this.password) {
      // Las credenciales son válidas, redirigir al usuario a la página de inicio
      this.router.navigate(['/home']);
    } else {
      // Las credenciales no son válidas, mostrar un mensaje de error o tomar alguna acción apropiada
      console.log('Credenciales incorrectas');
      // Puedes mostrar un mensaje de error en la interfaz de usuario o realizar otra acción aquí
    }
  }*/

}
