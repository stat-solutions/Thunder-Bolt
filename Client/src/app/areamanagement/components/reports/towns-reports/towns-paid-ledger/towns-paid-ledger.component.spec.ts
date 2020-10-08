import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownsPaidLedgerComponent } from './towns-paid-ledger.component';

describe('TownsPaidLedgerComponent', () => {
  let component: TownsPaidLedgerComponent;
  let fixture: ComponentFixture<TownsPaidLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownsPaidLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownsPaidLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
