import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInterestRateComponent } from './set-interest-rate.component';

describe('SetInterestRateComponent', () => {
  let component: SetInterestRateComponent;
  let fixture: ComponentFixture<SetInterestRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetInterestRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInterestRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
