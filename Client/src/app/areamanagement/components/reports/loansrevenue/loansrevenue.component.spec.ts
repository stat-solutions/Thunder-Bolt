import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansrevenueComponent } from './loansrevenue.component';

describe('LoansrevenueComponent', () => {
  let component: LoansrevenueComponent;
  let fixture: ComponentFixture<LoansrevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansrevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansrevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
