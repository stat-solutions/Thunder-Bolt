import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterAndTaxiparkComponent } from './cluster-and-taxipark.component';

describe('ClusterAndTaxiparkComponent', () => {
  let component: ClusterAndTaxiparkComponent;
  let fixture: ComponentFixture<ClusterAndTaxiparkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterAndTaxiparkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterAndTaxiparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
