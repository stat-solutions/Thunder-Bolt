import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversePrincipleComponent } from './reverse-principle.component';

describe('ReversePrincipleComponent', () => {
  let component: ReversePrincipleComponent;
  let fixture: ComponentFixture<ReversePrincipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReversePrincipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversePrincipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
