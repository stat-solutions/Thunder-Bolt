import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAdminUsersComponent } from './approve-admin-users.component';

describe('ApproveAdminUsersComponent', () => {
  let component: ApproveAdminUsersComponent;
  let fixture: ComponentFixture<ApproveAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAdminUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
