import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalSetupComponent } from './approval-setup.component';

describe('ApprovalSetupComponent', () => {
  let component: ApprovalSetupComponent;
  let fixture: ComponentFixture<ApprovalSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
