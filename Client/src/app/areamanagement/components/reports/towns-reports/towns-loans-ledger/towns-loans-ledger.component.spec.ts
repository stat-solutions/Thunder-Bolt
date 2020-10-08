import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownsLoansLedgerComponent } from './towns-loans-ledger.component';

describe('TownsLoansLedgerComponent', () => {
  let component: TownsLoansLedgerComponent;
  let fixture: ComponentFixture<TownsLoansLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownsLoansLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownsLoansLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
