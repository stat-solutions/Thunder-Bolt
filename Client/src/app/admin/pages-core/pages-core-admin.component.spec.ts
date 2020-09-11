import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesCoreadminComponent } from './pages-core-admin.component';


describe('PagesCoreComponent', () => {
  let component: PagesCoreadminComponent;
  let fixture: ComponentFixture<PagesCoreadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesCoreadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesCoreadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
