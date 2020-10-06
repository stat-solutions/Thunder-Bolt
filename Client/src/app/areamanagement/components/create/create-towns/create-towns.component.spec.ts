import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTownsComponent } from './create-towns.component';

describe('CreateTownsComponent', () => {
  let component: CreateTownsComponent;
  let fixture: ComponentFixture<CreateTownsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTownsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
