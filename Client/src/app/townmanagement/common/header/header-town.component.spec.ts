import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTownComponent } from './header-town.component';

describe('HeaderTownComponent', () => {
  let component: HeaderTownComponent;
  let fixture: ComponentFixture<HeaderTownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderTownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
