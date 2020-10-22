import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCentralUsersComponent } from './approve-central-users.component';

describe('ApproveCentralUsersComponent', () => {
  let component: ApproveCentralUsersComponent;
  let fixture: ComponentFixture<ApproveCentralUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCentralUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCentralUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
