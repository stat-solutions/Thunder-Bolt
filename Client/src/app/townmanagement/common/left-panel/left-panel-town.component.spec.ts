import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelTownComponent } from './left-panel-town.component';

describe('LeftPanelTownComponent', () => {
  let component: LeftPanelTownComponent;
  let fixture: ComponentFixture<LeftPanelTownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftPanelTownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPanelTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
