import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCentralComponent } from './header-central.component';

describe('HeaderCentralComponent', () => {
  let component: HeaderCentralComponent;
  let fixture: ComponentFixture<HeaderCentralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderCentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
