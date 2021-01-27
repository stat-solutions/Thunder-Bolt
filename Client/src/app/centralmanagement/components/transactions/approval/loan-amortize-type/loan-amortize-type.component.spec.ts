import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAmortizeTypeComponent } from './loan-amortize-type.component';

describe('LoanAmortizeTypeComponent', () => {
  let component: LoanAmortizeTypeComponent;
  let fixture: ComponentFixture<LoanAmortizeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAmortizeTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAmortizeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
