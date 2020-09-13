import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelStationComponent } from './left-panel-station.component';

describe('LeftPanelStationComponent', () => {
  let component: LeftPanelStationComponent;
  let fixture: ComponentFixture<LeftPanelStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftPanelStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPanelStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
