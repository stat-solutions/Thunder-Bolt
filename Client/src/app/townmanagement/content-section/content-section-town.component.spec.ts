import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSectionTownComponent } from './content-section-town.component';

describe('ContentSectionTownComponent', () => {
  let component: ContentSectionTownComponent;
  let fixture: ComponentFixture<ContentSectionTownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSectionTownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSectionTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
