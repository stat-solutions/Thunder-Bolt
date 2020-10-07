import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsPaidLedgerComponent } from './stations-paid-ledger.component';

describe('StationsPaidLedgerComponent', () => {
  let component: StationsPaidLedgerComponent;
  let fixture: ComponentFixture<StationsPaidLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationsPaidLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsPaidLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
