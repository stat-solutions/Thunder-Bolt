import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSectionCentralComponent } from './content-section-central.component';

describe('ContentSectionCentralComponent', () => {
  let component: ContentSectionCentralComponent;
  let fixture: ComponentFixture<ContentSectionCentralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSectionCentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSectionCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
