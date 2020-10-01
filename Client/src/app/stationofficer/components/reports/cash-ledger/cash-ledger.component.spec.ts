import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashLedgerComponent } from './cash-ledger.component';

describe('CashLedgerComponent', () => {
  let component: CashLedgerComponent;
  let fixture: ComponentFixture<CashLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
