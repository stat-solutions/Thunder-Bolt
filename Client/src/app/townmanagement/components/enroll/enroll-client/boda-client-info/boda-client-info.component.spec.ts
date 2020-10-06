import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodaClientInfoComponent } from './boda-client-info.component';

describe('BodaClientInfoComponent', () => {
  let component: BodaClientInfoComponent;
  let fixture: ComponentFixture<BodaClientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodaClientInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodaClientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
