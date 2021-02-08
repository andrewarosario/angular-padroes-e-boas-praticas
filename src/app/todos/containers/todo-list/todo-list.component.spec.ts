import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By, BrowserModule } from '@angular/platform-browser';
import { TodoComponent } from '../../components/todo/todo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoAddFormComponent } from '../../components/todo-add-form/todo-add-form.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent, TodoComponent, TodoAddFormComponent ],
      imports: [ 
          BrowserModule, 
          ReactiveFormsModule,
          HttpClientTestingModule
      ]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('AddTodo Form', () => {

    it('form should be invalid', () => {
        component.todoAddForm.setValue('');
        expect(component.todoAddForm.valid).toBeFalsy();
    });

    it('form should be valid', () => {
        component.todoAddForm.setValue('text');
        expect(component.todoAddForm.valid).toBeTruthy();
    });

    it('should call onAddTodo method', () => {

        spyOn(component, 'onAddTodo');
        const todoAddFormComponent = fixture.debugElement.query(By.directive(TodoAddFormComponent)).componentInstance; 
        todoAddFormComponent.onAddTodo.emit('text')

        expect(component.onAddTodo).toHaveBeenCalledWith('text');
    });
  })

});