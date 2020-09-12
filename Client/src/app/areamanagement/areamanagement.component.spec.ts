import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreamanagementComponent } from './areamanagement.component';

describe('AreamanagementComponent', () => {
  let component: AreamanagementComponent;
  let fixture: ComponentFixture<AreamanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreamanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreamanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
