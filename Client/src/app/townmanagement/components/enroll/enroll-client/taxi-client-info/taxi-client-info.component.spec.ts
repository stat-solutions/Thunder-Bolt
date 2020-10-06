import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiClientInfoComponent } from './taxi-client-info.component';

describe('TaxiClientInfoComponent', () => {
  let component: TaxiClientInfoComponent;
  let fixture: ComponentFixture<TaxiClientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxiClientInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxiClientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
