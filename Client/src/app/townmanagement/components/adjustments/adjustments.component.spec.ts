import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentsComponent } from './adjustments.component';

describe('AdjustmentsComponent', () => {
  let component: AdjustmentsComponent;
  let fixture: ComponentFixture<AdjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
