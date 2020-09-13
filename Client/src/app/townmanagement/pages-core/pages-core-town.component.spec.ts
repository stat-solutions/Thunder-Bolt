import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesCoreTownComponent } from './pages-core-town.component';


describe('PagesCoreTownComponent', () => {
  let component: PagesCoreTownComponent;
  let fixture: ComponentFixture<PagesCoreTownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesCoreTownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesCoreTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
