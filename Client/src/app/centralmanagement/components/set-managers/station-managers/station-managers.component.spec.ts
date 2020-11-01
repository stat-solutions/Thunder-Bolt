/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SetManagersComponent } from './set-managers.component';

describe('SetManagersComponent', () => {
  let component: SetManagersComponent;
  let fixture: ComponentFixture<SetManagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetManagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
