import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when call function getValue', () => {
    it('#Should return "My Value" when call function getValue', () => {
      expect(service.getValue()).toBe("My Value");
    });
  });

  describe('when call function setValue', () => {
    it('#Should return "Change" when call function setValue', () => {
      expect(service.getValue()).toBe('My Value');
      service.setValue('Change');
      expect(service.getValue()).toBe('Change');
    });
  });

  describe('when call function getPromiseValue', () => {
    it('#Should return "Promise Value" with then when call function getPromiseValue', (doneFn) => {
      service.getPromiseValue()
      .then((value) => {
        expect(value).toBe('Promise Value');
        doneFn();
      })
    });

    it('#Should return "Promise Value" with async when call function getPromiseValue', async() => {
      const resp = await service.getPromiseValue();
      expect(resp).toBe('Promise Value');
    });
  });

  describe('when call function getObservableValue', () => {
    it('#Should return "Promise Value" with subscribe when call function getObservableValue', (doneFn) => {
      service.getObservableValue()
      .subscribe((value) => {
        expect(value).toBe('Observable Value');
        doneFn();
      })
    });
  });
});
