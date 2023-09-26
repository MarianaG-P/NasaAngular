import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  
  // Método para guardar un objeto en el almacenamiento local
  saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Método para obtener un objeto del almacenamiento local
  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
