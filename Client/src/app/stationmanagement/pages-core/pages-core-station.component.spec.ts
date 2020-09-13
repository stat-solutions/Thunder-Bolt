import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesCoreStationComponent } from './pages-core-station.component';


describe('PagesCoreStationComponent', () => {
  let component: PagesCoreStationComponent;
  let fixture: ComponentFixture<PagesCoreStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesCoreStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesCoreStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
