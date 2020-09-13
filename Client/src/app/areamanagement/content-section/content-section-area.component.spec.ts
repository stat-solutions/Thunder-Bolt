import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSectionAreaComponent  } from './content-section-area.component';

describe('ContentSectionAreaComponent', () => {
  let component: ContentSectionAreaComponent ;
  let fixture: ComponentFixture<ContentSectionAreaComponent >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSectionAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSectionAreaComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
