import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelCentralComponent } from './left-panel-central.component';

describe('LeftPanelCentralComponent', () => {
  let component: LeftPanelCentralComponent;
  let fixture: ComponentFixture<LeftPanelCentralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftPanelCentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPanelCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
