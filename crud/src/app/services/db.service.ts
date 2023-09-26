import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {

  constructor() {
    super('DexieDB'); //permite acceder a las propiedades de la clase hija

    this.version(1).stores({
      usuarios: '++id, name, email, password, session' //el ++ es para que sea autoincremental
    })
    this.open().then(data => console.log("DB abierto")) .catch(err => console.log(err.message));
  }
}
