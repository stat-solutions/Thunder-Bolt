import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSectionStationComponent } from './content-section-station.component';

describe('ContentSectionStationComponent', () => {
  let component: ContentSectionStationComponent;
  let fixture: ComponentFixture<ContentSectionStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSectionStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSectionStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
