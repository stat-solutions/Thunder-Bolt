import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveStationUsersComponent } from './approve-station-users.component';

describe('ApproveStationUsersComponent', () => {
  let component: ApproveStationUsersComponent;
  let fixture: ComponentFixture<ApproveStationUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveStationUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveStationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
