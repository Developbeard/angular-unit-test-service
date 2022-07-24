import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { Auth } from '../models/auth.model';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true
        }
      ],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when call function login', () => {
    it('#Should return token when cal function login', (doneFn) => {
      // Arrage
      let mockResponse: Auth = {
        access_token: '121212'
      };
      let email = 'test@test.com';
      let password = 'password';
      
      // Act
      service.login(email, password).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockResponse);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });

    it('#Should call function saveToken when cal function login', (doneFn) => {
      // Arrage
      let mockResponse: Auth = {
        access_token: '121212'
      };
      let email = 'test@test.com';
      let password = 'password';
      spyOn(tokenService, 'saveToken').and.callThrough();
      
      // Act
      service.login(email, password).subscribe((data) => {
        // Assert
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledWith(mockResponse.access_token);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });
  });
});
