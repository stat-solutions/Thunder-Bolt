import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownsReportsComponent } from './towns-reports.component';

describe('TownsReportsComponent', () => {
  let component: TownsReportsComponent;
  let fixture: ComponentFixture<TownsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
