import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAddFormComponent } from './todo-add-form.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TodoAddFormComponent', () => {
  let component: TodoAddFormComponent;
  let fixture: ComponentFixture<TodoAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoAddFormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAddFormComponent);
    component = fixture.componentInstance;
    component.todoAddForm = new FormControl();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('todoAddForm should be valid', () => {
    expect(component.todoAddForm).toBeTruthy();
  });

  it('button should be disabled when todoAddForm is invalid', () => {
    component.todoAddForm = new FormControl();
    component.todoAddForm.setErrors({ incorrect: true });
    fixture.detectChanges();

    const buttonElement: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;

    let value: string = null;
    component.addTodo.subscribe(response => value = response);
    buttonElement.click();
    expect(value).toBeFalsy();
  });


  it('should emit value on click addTodo', () => {
    component.todoAddForm = new FormControl('text');
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    let value: string = null;
    component.addTodo.subscribe(response => value = response);
    buttonElement.click();
    expect(value).toBe('text');
  });
});
