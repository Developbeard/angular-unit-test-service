import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  private value = "My Value";

  constructor() { }

  getValue(){
    return this.value;
  }

  setValue(newValue:string){
    this.value = newValue;
  }

  getPromiseValue(){
    return Promise.resolve('Promise Value');
  }

  getObservableValue(){
    return of("Observable Value");
  }
}
