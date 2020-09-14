import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:Client/src/app/areamanagement/components/profile/profile.component.spec.ts
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ]
=======
import { StationofficerComponent } from './stationofficer.component';

describe('StationofficerComponent', () => {
  let component: StationofficerComponent;
  let fixture: ComponentFixture<StationofficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationofficerComponent ]
>>>>>>> 85e5d843593549c6d547c157a5974187dc1836bd:Client/src/app/stationofficer/stationofficer.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:Client/src/app/areamanagement/components/profile/profile.component.spec.ts
    fixture = TestBed.createComponent(ProfileComponent);
=======
    fixture = TestBed.createComponent(StationofficerComponent);
>>>>>>> 85e5d843593549c6d547c157a5974187dc1836bd:Client/src/app/stationofficer/stationofficer.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
