import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansLedgerComponent } from './loans-ledger.component';

describe('LoansLedgerComponent', () => {
  let component: LoansLedgerComponent;
  let fixture: ComponentFixture<LoansLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
