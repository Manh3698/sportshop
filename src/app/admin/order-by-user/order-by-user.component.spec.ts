import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByUserComponent } from './order-by-user.component';

describe('OrderByUserComponent', () => {
  let component: OrderByUserComponent;
  let fixture: ComponentFixture<OrderByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
