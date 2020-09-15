import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAreasComponent } from './approve-areas.component';

describe('ApproveAreasComponent', () => {
  let component: ApproveAreasComponent;
  let fixture: ComponentFixture<ApproveAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
