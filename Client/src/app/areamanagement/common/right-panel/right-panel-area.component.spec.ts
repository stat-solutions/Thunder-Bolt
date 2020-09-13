import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelAreaComponent } from './right-panel-area.component';

describe('RightPanelAreaComponent', () => {
  let component: RightPanelAreaComponent;
  let fixture: ComponentFixture<RightPanelAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightPanelAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPanelAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
