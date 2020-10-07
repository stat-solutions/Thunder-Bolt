import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsCashLedgerComponent } from './stations-cash-ledger.component';

describe('StationsCashLedgerComponent', () => {
  let component: StationsCashLedgerComponent;
  let fixture: ComponentFixture<StationsCashLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationsCashLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsCashLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
