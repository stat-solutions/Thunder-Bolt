import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodaLoanClientComponent } from './boda-loan-client.component';

describe('BodaLoanClientComponent', () => {
  let component: BodaLoanClientComponent;
  let fixture: ComponentFixture<BodaLoanClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodaLoanClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodaLoanClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
