import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralmanagementComponent } from './centralmanagement.component';

describe('CentralmanagementComponent', () => {
  let component: CentralmanagementComponent;
  let fixture: ComponentFixture<CentralmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
