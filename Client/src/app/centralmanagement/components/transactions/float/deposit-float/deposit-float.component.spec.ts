import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositFloatComponent } from './deposit-float.component';

describe('DepositFloatComponent', () => {
  let component: DepositFloatComponent;
  let fixture: ComponentFixture<DepositFloatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositFloatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
