import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TodoSearchFormComponent } from './todo-search-form.component';

describe('TodoSearchFormComponent', () => {
  let component: TodoSearchFormComponent;
  let fixture: ComponentFixture<TodoSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoSearchFormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoSearchFormComponent);
    component = fixture.componentInstance;
    component.todoSearchForm = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('todoSearchForm should be valid', () => {
    expect(component.todoSearchForm).toBeTruthy();
  });
});
