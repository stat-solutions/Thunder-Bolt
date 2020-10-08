import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownsCashLedgerComponent } from './towns-cash-ledger.component';

describe('TownsCashLedgerComponent', () => {
  let component: TownsCashLedgerComponent;
  let fixture: ComponentFixture<TownsCashLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownsCashLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownsCashLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
