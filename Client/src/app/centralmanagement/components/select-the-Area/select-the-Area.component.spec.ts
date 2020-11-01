/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectTheAreaComponent } from './select-the-Area.component';

describe('SelectTheTownComponent', () => {
  let component: SelectTheAreaComponent;
  let fixture: ComponentFixture<SelectTheAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTheAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTheAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
