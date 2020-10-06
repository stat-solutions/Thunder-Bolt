import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollClientComponent } from './enroll-client.component';

describe('EnrollClientComponent', () => {
  let component: EnrollClientComponent;
  let fixture: ComponentFixture<EnrollClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
