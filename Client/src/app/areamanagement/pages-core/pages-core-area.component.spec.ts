import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesCoreAreaComponent } from './pages-core-area.component';


describe('PagesCoreAreaComponent', () => {
  let component: PagesCoreAreaComponent;
  let fixture: ComponentFixture<PagesCoreAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesCoreAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesCoreAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
