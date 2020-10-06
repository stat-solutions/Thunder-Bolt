import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroClientInfoComponent } from './micro-client-info.component';

describe('MicroClientInfoComponent', () => {
  let component: MicroClientInfoComponent;
  let fixture: ComponentFixture<MicroClientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroClientInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroClientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
