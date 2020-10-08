import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBodaStageComponent } from './edit-boda-stage.component';

describe('EditBodaStageComponent', () => {
  let component: EditBodaStageComponent;
  let fixture: ComponentFixture<EditBodaStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBodaStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBodaStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
