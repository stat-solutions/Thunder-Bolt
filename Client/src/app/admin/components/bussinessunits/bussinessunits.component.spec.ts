import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessunitsComponent } from './bussinessunits.component';

describe('BussinessunitsComponent', () => {
  let component: BussinessunitsComponent;
  let fixture: ComponentFixture<BussinessunitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BussinessunitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessunitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
