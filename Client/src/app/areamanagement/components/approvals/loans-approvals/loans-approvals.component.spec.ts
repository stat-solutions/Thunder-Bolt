import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansApprovalsComponent } from './loans-approvals.component';

describe('LoansApprovalsComponent', () => {
  let component: LoansApprovalsComponent;
  let fixture: ComponentFixture<LoansApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
