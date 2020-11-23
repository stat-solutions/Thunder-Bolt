import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTenureComponent } from './loan-tenure.component';

describe('LoanTenureComponent', () => {
  let component: LoanTenureComponent;
  let fixture: ComponentFixture<LoanTenureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanTenureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanTenureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
