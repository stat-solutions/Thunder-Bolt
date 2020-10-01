import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansReportComponent } from './loans-report.component';

describe('LoansReportComponent', () => {
  let component: LoansReportComponent;
  let fixture: ComponentFixture<LoansReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
