import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTownUsersComponent } from './approve-town-users.component';

describe('ApproveTownUsersComponent', () => {
  let component: ApproveTownUsersComponent;
  let fixture: ComponentFixture<ApproveTownUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTownUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTownUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
