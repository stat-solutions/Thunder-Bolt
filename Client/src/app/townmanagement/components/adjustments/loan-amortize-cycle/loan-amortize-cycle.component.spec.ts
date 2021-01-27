import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAmortizeCycleComponent } from './loan-amortize-cycle.component';

describe('LoanAmortizeCycleComponent', () => {
  let component: LoanAmortizeCycleComponent;
  let fixture: ComponentFixture<LoanAmortizeCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAmortizeCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAmortizeCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
