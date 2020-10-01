import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiLoanClientComponent } from './taxi-loan-client.component';

describe('TaxiLoanClientComponent', () => {
  let component: TaxiLoanClientComponent;
  let fixture: ComponentFixture<TaxiLoanClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxiLoanClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxiLoanClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
