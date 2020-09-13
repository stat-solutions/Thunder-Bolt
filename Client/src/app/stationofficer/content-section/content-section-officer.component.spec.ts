import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSectionOfficerComponent } from './content-section-officer.component';

describe('ContentSectionOfficerComponent', () => {
  let component: ContentSectionOfficerComponent;
  let fixture: ComponentFixture<ContentSectionOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSectionOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSectionOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
