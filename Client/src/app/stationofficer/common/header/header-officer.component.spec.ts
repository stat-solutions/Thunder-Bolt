import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOfficerComponent } from './header-officer.component';

describe('HeaderOfficerComponent', () => {
  let component: HeaderOfficerComponent;
  let fixture: ComponentFixture<HeaderOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
