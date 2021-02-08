import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By, BrowserModule } from '@angular/platform-browser';
import { TodoComponent } from '../../components/todo/todo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent, TodoComponent ],
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

  describe('Add ToDo Form', () => {
    it('should call onAddTodo method', () => {
        spyOn(component, 'onAddTodo');
        const buttonElement: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
        buttonElement.click();
        expect(component.onAddTodo).toHaveBeenCalledTimes(0);
    });

    it('form should be invalid', () => {
        component.todoAddForm.setValue('');
        expect(component.todoAddForm.valid).toBeFalsy();
    });

    it('form should be valid', () => {
        component.todoAddForm.setValue('text');
        expect(component.todoAddForm.valid).toBeTruthy();
    });
  })

});