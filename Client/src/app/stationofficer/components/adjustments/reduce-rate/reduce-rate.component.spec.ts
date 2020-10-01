import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduceRateComponent } from './reduce-rate.component';

describe('ReduceRateComponent', () => {
  let component: ReduceRateComponent;
  let fixture: ComponentFixture<ReduceRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReduceRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduceRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
