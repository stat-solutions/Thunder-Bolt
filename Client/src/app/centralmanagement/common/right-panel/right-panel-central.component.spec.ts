import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelCentralComponent } from './right-panel-central.component';

describe('RightPanelCentralComponent', () => {
  let component: RightPanelCentralComponent;
  let fixture: ComponentFixture<RightPanelCentralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightPanelCentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPanelCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
