import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollTaxiStageComponent } from './enroll-taxi-stage.component';

describe('EnrollTaxiStageComponent', () => {
  let component: EnrollTaxiStageComponent;
  let fixture: ComponentFixture<EnrollTaxiStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollTaxiStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollTaxiStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
