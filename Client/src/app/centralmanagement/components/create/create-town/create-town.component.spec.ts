import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTownComponent } from './create-town.component';

describe('CreateTownComponent', () => {
  let component: CreateTownComponent;
  let fixture: ComponentFixture<CreateTownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
