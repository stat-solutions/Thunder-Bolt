import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLoanLimitComponent } from './set-loan-limit.component';

describe('SetLoanLimitComponent', () => {
  let component: SetLoanLimitComponent;
  let fixture: ComponentFixture<SetLoanLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetLoanLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLoanLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
