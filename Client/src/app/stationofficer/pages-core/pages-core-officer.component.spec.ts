import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesCoreOfficerComponent } from './pages-core-officer.component';


describe('PagesCoreOfficerComponent', () => {
  let component: PagesCoreOfficerComponent;
  let fixture: ComponentFixture<PagesCoreOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesCoreOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesCoreOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
