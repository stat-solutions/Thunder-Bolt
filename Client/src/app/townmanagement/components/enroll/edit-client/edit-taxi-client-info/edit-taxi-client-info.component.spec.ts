import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxiClientInfoComponent } from './edit-taxi-client-info.component';

describe('EditTaxiClientInfoComponent', () => {
  let component: EditTaxiClientInfoComponent;
  let fixture: ComponentFixture<EditTaxiClientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaxiClientInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaxiClientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
