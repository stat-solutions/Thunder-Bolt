import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxiStageComponent } from './edit-taxi-stage.component';

describe('EditTaxiStageComponent', () => {
  let component: EditTaxiStageComponent;
  let fixture: ComponentFixture<EditTaxiStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaxiStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaxiStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
