import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './core/components/header/header.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent, HeaderComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'TODO APP'`, () => {
    expect(component.title).toEqual('TODO APP');
  });

  it(`should contain a header with title`, () => {
    const headerComponent: HeaderComponent = fixture.debugElement.query(
      By.directive(HeaderComponent)
    ).componentInstance;
    expect(headerComponent).toBeTruthy();
    expect(headerComponent.title).toBe('TODO APP');
  });

});
