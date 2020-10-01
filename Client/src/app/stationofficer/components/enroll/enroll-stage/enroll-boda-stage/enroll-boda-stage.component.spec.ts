import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollBodaStageComponent } from './enroll-boda-stage.component';

describe('EnrollBodaStageComponent', () => {
  let component: EnrollBodaStageComponent;
  let fixture: ComponentFixture<EnrollBodaStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollBodaStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollBodaStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
