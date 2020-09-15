import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatApprovalComponent } from './float-approval.component';

describe('FloatApprovalComponent', () => {
  let component: FloatApprovalComponent;
  let fixture: ComponentFixture<FloatApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
