import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLoanAmortizeCycleComponent } from './set-loan-amortize-cycle.component';

describe('SetLoanAmortizeCycleComponent', () => {
  let component: SetLoanAmortizeCycleComponent;
  let fixture: ComponentFixture<SetLoanAmortizeCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetLoanAmortizeCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLoanAmortizeCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
