import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCommissionRateComponent } from './loan-commission-rate.component';

describe('LoanCommissionRateComponent', () => {
  let component: LoanCommissionRateComponent;
  let fixture: ComponentFixture<LoanCommissionRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanCommissionRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCommissionRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
