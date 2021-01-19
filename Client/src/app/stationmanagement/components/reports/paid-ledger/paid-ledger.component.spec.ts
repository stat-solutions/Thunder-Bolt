import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidLedgerComponent } from './paid-ledger.component';

describe('PaidLedgerComponent', () => {
  let component: PaidLedgerComponent;
  let fixture: ComponentFixture<PaidLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
