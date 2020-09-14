import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:Client/src/app/areamanagement/components/dashboard/dashboard.component.spec.ts
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
=======
import { TownmanagementComponent } from './townmanagement.component';

describe('TownmanagementComponent', () => {
  let component: TownmanagementComponent;
  let fixture: ComponentFixture<TownmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownmanagementComponent ]
>>>>>>> 85e5d843593549c6d547c157a5974187dc1836bd:Client/src/app/townmanagement/townmanagement.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:Client/src/app/areamanagement/components/dashboard/dashboard.component.spec.ts
    fixture = TestBed.createComponent(DashboardComponent);
=======
    fixture = TestBed.createComponent(TownmanagementComponent);
>>>>>>> 85e5d843593549c6d547c157a5974187dc1836bd:Client/src/app/townmanagement/townmanagement.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
