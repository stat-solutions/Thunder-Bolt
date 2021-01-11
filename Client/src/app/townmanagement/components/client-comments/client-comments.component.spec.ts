import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCommentsComponent } from './client-comments.component';

describe('ClientCommentsComponent', () => {
  let component: ClientCommentsComponent;
  let fixture: ComponentFixture<ClientCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
