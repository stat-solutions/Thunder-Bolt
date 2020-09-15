import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTownsComponent } from './approve-towns.component';

describe('ApproveTownsComponent', () => {
  let component: ApproveTownsComponent;
  let fixture: ComponentFixture<ApproveTownsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTownsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
