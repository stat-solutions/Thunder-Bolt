import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedLedgerComponent } from './borrowed-ledger.component';

describe('BorrowedLedgerComponent', () => {
  let component: BorrowedLedgerComponent;
  let fixture: ComponentFixture<BorrowedLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowedLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowedLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
