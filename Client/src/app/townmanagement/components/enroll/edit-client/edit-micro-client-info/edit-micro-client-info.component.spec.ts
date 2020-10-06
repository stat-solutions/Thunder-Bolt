import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMicroClientInfoComponent } from './edit-micro-client-info.component';

describe('EditMicroClientInfoComponent', () => {
  let component: EditMicroClientInfoComponent;
  let fixture: ComponentFixture<EditMicroClientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMicroClientInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMicroClientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
