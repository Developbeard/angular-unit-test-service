import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapsService
      ]
    });
    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when call function getCurrentPosition', () => {
    it('#Should save the center position when call function getCurrent Position', () => {
      // Arrange
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successFn) => {
        const mockGeolocation = {
          coords: {
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            latitude: 1000,
            longitude: 2000,
            speed: 0
          },
          timestamp: 0
        };
        successFn(mockGeolocation);
      });

      // Act
      service.getCurrentPosition();

      // Assert
      expect(service.center.lat).toEqual(1000);
      expect(service.center.lng).toEqual(2000);
    });
  });

});
