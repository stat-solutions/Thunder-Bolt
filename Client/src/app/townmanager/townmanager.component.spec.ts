import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownmanagerComponent } from './townmanager.component';

describe('TownmanagerComponent', () => {
  let component: TownmanagerComponent;
  let fixture: ComponentFixture<TownmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownmanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
