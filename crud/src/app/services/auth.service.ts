import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './user.interface';  
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<boolean>(false);

  
  constructor(private db:DbService) { }

  userData: User = {
    name: '',
    email: '',
    password: '',
    session: false
  }

  async getlogin(data: NgForm) { //función que va a devolver una promesa
    
    const name = data.value.name
    const password = data.value.password
    const encryptedPassword = CryptoJS.SHA256(password).toString()
    /*console.log(data.value.name)
    console.log(data.value.password)
    console.log(encryptedPassword)*/

    try {
      // Realiza una consulta a la base de datos utilizando Dexie.js
      const $userData = await this.db.table('usuarios')
        .filter(user => user.name === name && user.password === encryptedPassword && user.id)
        .toArray();
        

      if ($userData && $userData.length > 0) {
        console.log('Usuario encontrado:', $userData[0]);
        const user = $userData[0];       
        
        try{
          
            await this.db.table('usuarios').update(user.id, {session:true})
            this.setAuthState(true);
            this.userData.session = true
            this.userData = user            
            return true;
            
        }catch(error){
          console.log("Error session update ")
        }
        return $userData[0];

      } else {
        console.log('Usuario no encontrado');
        alert('El usuario no exise')
        return null;
      }
    } catch (error) {
      console.error('Error al acceder a la base de datos:', error);
      return null;
    }
  }

  logout(){
    this.db.table('usuarios').update(this.userData.id, {session:false})
    this.userData.session = false;
    this.setAuthState(false);
    return false;
  }
  private setAuthState(isAuthenticated: boolean) {
    this.authStateSubject.next(isAuthenticated); // Método privado para establecer el estado de autenticación
  }
  getAuthState(): Observable<boolean> {
    return this.authStateSubject.asObservable(); // Método público para obtener el estado de autenticación
  }
  isAuth(){
    return this.userData.session; 
  }
}
