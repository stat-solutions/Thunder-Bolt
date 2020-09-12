import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreamanagerComponent } from './areamanager.component';

describe('AreamanagerComponent', () => {
  let component: AreamanagerComponent;
  let fixture: ComponentFixture<AreamanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreamanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreamanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
