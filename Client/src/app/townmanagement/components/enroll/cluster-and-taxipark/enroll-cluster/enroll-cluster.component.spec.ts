import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollClusterComponent } from './enroll-cluster.component';

describe('EnrollClusterComponent', () => {
  let component: EnrollClusterComponent;
  let fixture: ComponentFixture<EnrollClusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollClusterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
