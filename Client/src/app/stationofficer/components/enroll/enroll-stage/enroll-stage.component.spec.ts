import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollStageComponent } from './enroll-stage.component';

describe('EnrollStageComponent', () => {
  let component: EnrollStageComponent;
  let fixture: ComponentFixture<EnrollStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
