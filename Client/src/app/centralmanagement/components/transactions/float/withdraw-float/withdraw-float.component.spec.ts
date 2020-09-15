import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawFloatComponent } from './withdraw-float.component';

describe('WithdrawFloatComponent', () => {
  let component: WithdrawFloatComponent;
  let fixture: ComponentFixture<WithdrawFloatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawFloatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
