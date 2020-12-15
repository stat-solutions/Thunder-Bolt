import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLoanTenureComponent } from './set-loan-tenure.component';

describe('SetLoanTenureComponent', () => {
  let component: SetLoanTenureComponent;
  let fixture: ComponentFixture<SetLoanTenureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetLoanTenureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLoanTenureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
