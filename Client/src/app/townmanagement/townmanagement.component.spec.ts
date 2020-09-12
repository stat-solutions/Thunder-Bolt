import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownmanagementComponent } from './townmanagement.component';

describe('TownmanagementComponent', () => {
  let component: TownmanagementComponent;
  let fixture: ComponentFixture<TownmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
