import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let stubProductService = jasmine.createSpyObj('productService', ['getAllSimple'])

  beforeEach(() => {
    component = new ProductsComponent(stubProductService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
