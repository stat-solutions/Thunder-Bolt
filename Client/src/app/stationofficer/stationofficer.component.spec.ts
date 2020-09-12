import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationofficerComponent } from './stationofficer.component';

describe('StationofficerComponent', () => {
  let component: StationofficerComponent;
  let fixture: ComponentFixture<StationofficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationofficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationofficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
