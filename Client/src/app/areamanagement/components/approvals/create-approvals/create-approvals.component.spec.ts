import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateApprovalsComponent } from './create-approvals.component';

describe('CreateApprovalsComponent', () => {
  let component: CreateApprovalsComponent;
  let fixture: ComponentFixture<CreateApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
