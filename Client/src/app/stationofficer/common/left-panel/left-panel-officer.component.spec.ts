import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelOfficerComponent } from './left-panel-officer.component';

describe('LeftPanelOfficerComponent', () => {
  let component: LeftPanelOfficerComponent;
  let fixture: ComponentFixture<LeftPanelOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftPanelOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPanelOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
