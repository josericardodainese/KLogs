import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  add(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  find(key: string): any {
    return JSON.parse(<string>localStorage.getItem(key));
  }

  remove(key: string): any {
    return localStorage.removeItem(key);
  }
}
