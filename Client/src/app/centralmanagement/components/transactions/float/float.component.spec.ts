import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:Client/src/app/centralmanagement/components/transactions/float/float.component.spec.ts
import { FloatComponent } from './float.component';

describe('FloatComponent', () => {
  let component: FloatComponent;
  let fixture: ComponentFixture<FloatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatComponent ]
=======
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComponent ]
>>>>>>> ce04b8d... first commit of central module:Client/src/app/centralmanagement/components/create/create.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:Client/src/app/centralmanagement/components/transactions/float/float.component.spec.ts
    fixture = TestBed.createComponent(FloatComponent);
=======
    fixture = TestBed.createComponent(CreateComponent);
>>>>>>> ce04b8d... first commit of central module:Client/src/app/centralmanagement/components/create/create.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
