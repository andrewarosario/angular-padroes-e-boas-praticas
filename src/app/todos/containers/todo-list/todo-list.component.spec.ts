import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By, BrowserModule } from '@angular/platform-browser';
import { TodoComponent } from '../../components/todo/todo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoAddFormComponent } from '../../components/todo-add-form/todo-add-form.component';
import { TodosFacade } from '../../todos.facade';
import { todosFacadeStub } from '../../mocks/todos-facade.mock';
import { mockUncompletedTodos, mockCompletedTodos } from '../../mocks/todos.mock';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let facade: TodosFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent, TodoComponent, TodoAddFormComponent ],
      imports: [ 
          BrowserModule, 
          ReactiveFormsModule,
          HttpClientTestingModule
      ],
      providers: [
          { 
              provide: TodosFacade, 
              useValue: todosFacadeStub
          }
      ]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(TodosFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a "p" title tag with uncompleted todos', () => {
    const elements = fixture.debugElement.queryAll(By.css('p'));
    expect(elements[0].nativeElement.innerText.trim()).toEqual('Uncompleted todos:')
  });

  it('should contain a "p" title tag with completed todos', () => {
    const elements = fixture.debugElement.queryAll(By.css('p'));
    expect(elements[1].nativeElement.innerText.trim()).toEqual('Completed todos:')
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

  describe('Todo List', () => {
      it('should call "facade.loadAll" on init', () => {
        spyOn(facade, 'loadAll');
        component.ngOnInit();
        expect(facade.loadAll).toHaveBeenCalled();
      })

      it('should show todos list', async () => {
        fixture.detectChanges();
        const uncompletedTodos = fixture.nativeElement.querySelectorAll('.uncompleted-todos');
        const completedTodos = fixture.nativeElement.querySelectorAll('.completed-todos');
        expect(uncompletedTodos.length).toBe(mockUncompletedTodos.length);
        expect(completedTodos.length).toBe(mockCompletedTodos.length);
      });

      it('should call "facade.setCompleted" method on toggle todo', () => {
        fixture.detectChanges();
        spyOn(facade, 'setCompleted');
        const todoComponent = fixture.debugElement.query(By.directive(TodoComponent)).componentInstance; 
        todoComponent.markComplete.emit(true)
        expect(facade.setCompleted).toHaveBeenCalledWith(todoComponent.todo.id, true);
      });

      it('should call "facade.removeTodo" method on remove todo', () => {
        fixture.detectChanges();
        spyOn(facade, 'removeTodo');
        const todoComponent = fixture.debugElement.query(By.directive(TodoComponent)).componentInstance; 
        todoComponent.remove.emit(todoComponent.todo.id)
        expect(facade.removeTodo).toHaveBeenCalledWith(todoComponent.todo.id);
      });
  });

});