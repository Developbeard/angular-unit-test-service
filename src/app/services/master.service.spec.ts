import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueFakeService } from './value-fake.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;
  let stubValueService = jasmine.createSpyObj('valueService', ['getValue']);

  beforeEach(() => {
    // with TestBed
    // TestBed.configureTestingModule({
    //   providers: [ 
    //     MasterService,
    //     { provide: ValueService, useValue: stubValueService}
    //   ]
    // });

    // masterService = TestBed.inject(MasterService);
    // valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    // without TestBed
      masterService = new MasterService(stubValueService);
  })

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  describe('when call function getValue', () => {
    // it('#Should return "My Value" from the real service when call function getValue', () => { //<----- No recomendable (no se deben probar servicios reales)
    //   const valueService = new ValueService();
    //   const masterService = new MasterService(valueService);
    //   expect(masterService.getValue()).toBe('My Value');
    // });

    // it('#Should return "Fake Value" from the fake service when call function getValue', () => { //<----- No recomendable (mucho mantenimiento)
    //   const valueFakeService = new ValueFakeService();
    //   const masterService = new MasterService(valueFakeService as unknown as ValueService);
    //   expect(masterService.getValue()).toBe('Fake Value');
    // });

    // it('#Should return "Fake from Object" from the fake object when call function getValue', () => { //<----- No recomendable (ejecuta la funcion mas no el servicio)
    //   const fake = { getValue: () => 'Fake from Object' };
    //   const masterService = new MasterService(fake as ValueService);
    //   expect(masterService.getValue()).toBe('Fake from Object');
    // });

    it('#Should call fuction getValue from ValueService when call function getValue', (doneFn) => { //<----- recomendable (se utiliza en BCP)
      masterService.getValue();

      expect(stubValueService.getValue).toHaveBeenCalled();
      doneFn();
    });

    it('#Should return "Fake Value with jasmine.createSpyObj" from ValueService when call function getValue', (doneFn) => { //<----- recomendable (se utiliza en BCP)
      stubValueService.getValue.and.returnValue('Fake Value with jasmine.createSpyObj');

      masterService.getValue();
      
      expect(masterService.getValue()).toBe('Fake Value with jasmine.createSpyObj');
      doneFn();
    });


  });
});
