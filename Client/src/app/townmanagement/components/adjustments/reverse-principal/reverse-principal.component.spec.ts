import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversePrincipalComponent } from './reverse-principal.component';

describe('ReversePrincipalComponent', () => {
  let component: ReversePrincipalComponent;
  let fixture: ComponentFixture<ReversePrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReversePrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
