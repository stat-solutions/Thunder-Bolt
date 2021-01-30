import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLoanAmortizeTypeComponent } from './set-loan-amortize-type.component';

describe('SetLoanAmortizeTypeComponent', () => {
  let component: SetLoanAmortizeTypeComponent;
  let fixture: ComponentFixture<SetLoanAmortizeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetLoanAmortizeTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLoanAmortizeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
