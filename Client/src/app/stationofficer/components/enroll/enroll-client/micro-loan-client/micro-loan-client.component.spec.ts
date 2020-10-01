import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroLoanClientComponent } from './micro-loan-client.component';

describe('MicroLoanClientComponent', () => {
  let component: MicroLoanClientComponent;
  let fixture: ComponentFixture<MicroLoanClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroLoanClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroLoanClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
