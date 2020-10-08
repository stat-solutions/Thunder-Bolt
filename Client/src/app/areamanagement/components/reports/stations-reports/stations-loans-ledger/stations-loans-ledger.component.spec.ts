import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsLoansLedgerComponent } from './stations-loans-ledger.component';

describe('StationsLoansLedgerComponent', () => {
  let component: StationsLoansLedgerComponent;
  let fixture: ComponentFixture<StationsLoansLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationsLoansLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsLoansLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
