import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStationsComponent } from './create-stations.component';

describe('CreateStationsComponent', () => {
  let component: CreateStationsComponent;
  let fixture: ComponentFixture<CreateStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
