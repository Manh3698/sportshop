import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateProductsComponent } from './cate-products.component';

describe('CateProductsComponent', () => {
  let component: CateProductsComponent;
  let fixture: ComponentFixture<CateProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
