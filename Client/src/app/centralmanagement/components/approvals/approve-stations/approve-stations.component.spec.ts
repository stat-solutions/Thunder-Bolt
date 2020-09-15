import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveStationsComponent } from './approve-stations.component';

describe('ApproveStationsComponent', () => {
  let component: ApproveStationsComponent;
  let fixture: ComponentFixture<ApproveStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveStationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
