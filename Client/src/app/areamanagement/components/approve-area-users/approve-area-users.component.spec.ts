import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAreaUsersComponent } from './approve-area-users.component';

describe('ApproveAreaUsersComponent', () => {
  let component: ApproveAreaUsersComponent;
  let fixture: ComponentFixture<ApproveAreaUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAreaUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAreaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
