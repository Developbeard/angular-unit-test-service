import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from './../../environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { TokenService } from './token.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController; //<------- Setear el HttpTestingController
  let tokenService: TokenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true
        }
      ],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  describe('when initialize', () => {
    it('#Should be created when initialize', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('when call funtion getAllSimple', () => {
    it('#Should return a product list when call function getAllSimple', (doneFn) => {
      // Arrage
      let mockResponse: Product[] = generateManyProducts(2);
      let token = '321';
      spyOn(tokenService, 'getToken').and.returnValue(token);

      // Act
      service.getAllSimple().subscribe((data) => {
        // Assert
        expect(data).toEqual(mockResponse);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual(`Bearer ${token}`);
      req.flush(mockResponse);
    });
  });

  describe('when call funtion getAll', () => {
    it('#Should return product list when call function getAll', (doneFn) => {
      // Arrage
      const mockResponse: Product[] = generateManyProducts(3);

      // Act
      service.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockResponse.length);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });

    it('#Should return product list with taxes when call function getAll', (doneFn) => {
      // Arrage
      const mockResponse: Product[] = [
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 200,
        },
      ];

      // Act
      service.getAll().subscribe((data) => {
        // Assert
        expect(data[1].taxes).toEqual(38);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });

    it('#Should return product list with taxes if price is zero when call function getAll', (doneFn) => {
      // Arrage
      const mockResponse: Product[] = [
        {
          ...generateOneProduct(),
          price: 0,
        },
      ];

      // Act
      service.getAll().subscribe((data) => {
        // Assert
        expect(data[0].taxes).toEqual(0);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });

    it('#Should return product list with taxes if price is negative when call function getAll', (doneFn) => {
      // Arrage
      const mockResponse: Product[] = [
        {
          ...generateOneProduct(),
          price: -100,
        },
      ];

      // Act
      service.getAll().subscribe((data) => {
        // Assert
        expect(data[0].taxes).toEqual(0);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });

    it('#Should send query params with limit 10 and offset 3 when call function getAll', (doneFn) => {
      // Arrage
      const mockResponse: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;

      // Act
      service.getAll(limit, offset).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockResponse.length);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });

    it('#Should send query params with limit 0 and offset 3 when call function getAll', (doneFn) => {
      // Arrage
      const mockResponse: Product[] = generateManyProducts(3);
      const limit = 0;
      const offset = 3;

      // Act
      service.getAll(limit, offset).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockResponse.length);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });

    it('#Should send query params with limit 10 and offset 0 when call function getAll', (doneFn) => {
      // Arrage
      const mockResponse: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 0;

      // Act
      service.getAll(limit, offset).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockResponse.length);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });

    it('#Should send query params with only limit 10 when call function getAll', (doneFn) => {
      // Arrage
      const mockResponse: Product[] = generateManyProducts(3);
      const limit = 10;

      // Act
      service.getAll(limit).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockResponse.length);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });

    it('#Should send query params with only offset 3 when call function getAll', (doneFn) => {
      // Arrage
      const mockResponse: Product[] = generateManyProducts(3);
      const offset = 3;

      // Act
      service.getAll(offset).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockResponse.length);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockResponse);
    });
  });

  describe('when call function create', () => {
    it('#Should create a product when call function create', (doneFn) => {
      // Arrage
      const mockResponse: Product = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'Producto Z',
        price: 100,
        images: ['j1', 'j2'],
        description: 'Huele a limon',
        categoryId: 12,
      };

      // Act
      service.create({ ...dto }).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockResponse);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      expect(req.request.body).toEqual(dto); //<-------- Probar si el request body es igual
      expect(req.request.method).toEqual('POST'); //<-------- Probar si el metodo el servicio es correcto (prueba importante)
      req.flush(mockResponse);
    });
  });

  describe('when call function update', () => {
    it('#Should update a product when call function update', (doneFn) => {
      // Arrage
      const id = '1';
      const mockResponse: Product = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'Product Update',
      };

      // Act
      service.update(id, {...dto}).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockResponse);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.body).toEqual(dto); //<-------- Probar si el request body es igual
      expect(req.request.method).toEqual('PUT'); //<-------- Probar si el metodo el servicio es correcto (prueba importante)
      req.flush(mockResponse);
    });
  });

  describe('when call function delete', () => {
    it('#Should delete a product when call function update', (doneFn) => {
      // Arrage
      const id = '1';
      const mockResponse = true;

      // Act
      service.delete(id).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockResponse);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products/${id}`
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE') //<-------- Probar si el metodo el servicio es correcto (prueba importante)
      req.flush(mockResponse);
    });
  });

  describe('when call function getOne', () => {
    it('#Should get a product when call function getOne', (doneFn) => {
      // Arrage
      const id = '1';
      const mockResponse: Product = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'Product Update',
      };

      // Act
      service.getOne(id).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockResponse);
        doneFn();
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET'); //<-------- Probar si el metodo el servicio es correcto (prueba importante)
      req.flush(mockResponse);
    });

    it('#Should return right message error 409 when call function getOne', (doneFn) => {
      // Arrage
      const id = '1';
      const messageErr = '409 Message';
      const mockErr = {
        status: HttpStatusCode.Conflict,
        statusText: messageErr
      }

      // Act
      service.getOne(id).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual('Algo esta fallando en el server');
          doneFn();
        }
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET'); //<-------- Probar si el metodo el servicio es correcto (prueba importante)
      req.flush(messageErr, mockErr);
    });

    it('#Should return right message error 404 when call function getOne', (doneFn) => {
      // Arrage
      const id = '1';
      const messageErr = '404 Message';
      const mockErr = {
        status: HttpStatusCode.NotFound,
        statusText: messageErr
      }

      // Act
      service.getOne(id).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual('El producto no existe');
          doneFn();
        }
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET'); //<-------- Probar si el metodo el servicio es correcto (prueba importante)
      req.flush(messageErr, mockErr);
    });

    it('#Should return right message error 401 when call function getOne', (doneFn) => {
      // Arrage
      const id = '1';
      const messageErr = '401 Message';
      const mockErr = {
        status: HttpStatusCode.Unauthorized,
        statusText: messageErr
      }

      // Act
      service.getOne(id).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual('No estas permitido');
          doneFn();
        }
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET'); //<-------- Probar si el metodo el servicio es correcto (prueba importante)
      req.flush(messageErr, mockErr);
    });

    it('#Should return right message error no valid when call function getOne', (doneFn) => {
      // Arrage
      const id = '1';
      const messageErr = '500 Message';
      const mockErr = {
        status: HttpStatusCode.InternalServerError,
        statusText: messageErr
      }

      // Act
      service.getOne(id).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual('Ups algo salio mal');
          doneFn();
        }
      });

      // Http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET'); //<-------- Probar si el metodo el servicio es correcto (prueba importante)
      req.flush(messageErr, mockErr);
    });
  });
});
