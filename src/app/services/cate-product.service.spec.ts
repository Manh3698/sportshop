import { TestBed } from '@angular/core/testing';

import { CateProductService } from './cate-product.service';

describe('CateProductService', () => {
  let service: CateProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CateProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
