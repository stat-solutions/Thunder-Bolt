import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesCoreCentralComponent } from './pages-core-central.component';


describe('PagesCoreCentralComponent', () => {
  let component: PagesCoreCentralComponent;
  let fixture: ComponentFixture<PagesCoreCentralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesCoreCentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesCoreCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
