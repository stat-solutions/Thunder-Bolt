import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelTownComponent } from './right-panel-town.component';

describe('RightPanelTownComponent', () => {
  let component: RightPanelTownComponent;
  let fixture: ComponentFixture<RightPanelTownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightPanelTownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPanelTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
