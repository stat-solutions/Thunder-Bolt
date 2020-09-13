import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelOfficerComponent } from './right-panel-officer.component';

describe('RightPanelOfficerComponent', () => {
  let component: RightPanelOfficerComponent;
  let fixture: ComponentFixture<RightPanelOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightPanelOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPanelOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
