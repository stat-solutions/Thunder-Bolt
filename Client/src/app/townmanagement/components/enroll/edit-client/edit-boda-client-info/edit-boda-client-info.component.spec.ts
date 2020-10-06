import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBodaClientInfoComponent } from './edit-boda-client-info.component';

describe('EditBodaClientInfoComponent', () => {
  let component: EditBodaClientInfoComponent;
  let fixture: ComponentFixture<EditBodaClientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBodaClientInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBodaClientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
