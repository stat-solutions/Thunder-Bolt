import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanLimitComponent } from './loan-limit.component';

describe('LoanLimitComponent', () => {
  let component: LoanLimitComponent;
  let fixture: ComponentFixture<LoanLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
