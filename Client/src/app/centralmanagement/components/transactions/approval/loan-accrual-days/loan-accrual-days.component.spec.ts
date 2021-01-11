import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAccrualDaysComponent } from './loan-accrual-days.component';

describe('LoanAccrualDaysComponent', () => {
  let component: LoanAccrualDaysComponent;
  let fixture: ComponentFixture<LoanAccrualDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAccrualDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAccrualDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
