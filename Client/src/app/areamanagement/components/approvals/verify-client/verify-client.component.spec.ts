import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyClientComponent } from './verify-client.component';

describe('VerifyClientComponent', () => {
  let component: VerifyClientComponent;
  let fixture: ComponentFixture<VerifyClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
