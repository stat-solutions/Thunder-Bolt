import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelStationComponent } from './right-panel-station.component';

describe('RightPanelStationComponent', () => {
  let component: RightPanelStationComponent;
  let fixture: ComponentFixture<RightPanelStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightPanelStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPanelStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
