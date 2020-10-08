import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsReportsComponent } from './stations-reports.component';

describe('StationsReportsComponent', () => {
  let component: StationsReportsComponent;
  let fixture: ComponentFixture<StationsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
