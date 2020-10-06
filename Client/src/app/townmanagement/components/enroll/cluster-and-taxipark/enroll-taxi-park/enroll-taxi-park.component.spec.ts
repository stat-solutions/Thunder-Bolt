import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollTaxiParkComponent } from './enroll-taxi-park.component';

describe('EnrollTaxiParkComponent', () => {
  let component: EnrollTaxiParkComponent;
  let fixture: ComponentFixture<EnrollTaxiParkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollTaxiParkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollTaxiParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
