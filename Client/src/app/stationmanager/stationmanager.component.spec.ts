import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationmanagerComponent } from './stationmanager.component';

describe('StationmanagerComponent', () => {
  let component: StationmanagerComponent;
  let fixture: ComponentFixture<StationmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationmanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
