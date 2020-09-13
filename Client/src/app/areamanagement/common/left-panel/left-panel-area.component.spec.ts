import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelAreaComponent } from './left-panel-area.component';

describe('LeftPanelAreaComponent', () => {
  let component: LeftPanelAreaComponent;
  let fixture: ComponentFixture<LeftPanelAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftPanelAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPanelAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
