import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLoanRateComponent } from './set-loan-rate.component';

describe('SetLoanRateComponent', () => {
  let component: SetLoanRateComponent;
  let fixture: ComponentFixture<SetLoanRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetLoanRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLoanRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
