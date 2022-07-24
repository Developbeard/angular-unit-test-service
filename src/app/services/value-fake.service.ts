export class ValueFakeService {
  private value = "My Value";

  constructor() { }

  getValue(){
    return 'Fake Value';
  }

  setValue(newValue:string){
    // this.value = newValue;
  }

  getPromiseValue(){
    return Promise.resolve('Promise Fake Value');
  }

//   getObservableValue(){
//     return of("Observable Value");
//   }
}
