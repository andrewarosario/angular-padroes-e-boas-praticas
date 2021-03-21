import { TodosState } from './todos.state';
import { TestBed } from '@angular/core/testing';
import { mockAllTodos, mockUncompletedTodos, mockCompletedTodos, mockTodo } from '../mocks/todos.mock';

describe('TodosState', () => {
    let service: TodosState;

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [TodosState],
        });
    });

    beforeEach(() => {
        service = TestBed.inject(TodosState);
        service.todos = mockAllTodos;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an Observable of all todos', () => {
        service.todos$.subscribe(todos => {
            expect(todos).toEqual(mockAllTodos);
        });
    });

    it('should return an Observable of all uncompleted todos', done => {
        service.uncompletedTodos$.subscribe(todos => {
            expect(todos).toEqual(mockUncompletedTodos);
            done();
        });
    });

    it('should return an Observable of all completed todos', done => {
        service.completedTodos$.subscribe(todos => {
            expect(todos).toEqual(mockCompletedTodos);
            done();
        });
    });

    it('should add todo', () => {
        const todo = service.addTodo(mockTodo);
        expect(service.todos.length).toEqual(mockAllTodos.length + 1);
        expect(service.todos).toEqual([ ...mockAllTodos, mockTodo ]);
        expect(todo).toEqual(mockTodo);
    });

    it('should remove todo', () => {
        service.removeTodo(mockAllTodos[1].id);
        expect(service.todos.length).toEqual(mockAllTodos.length - 1);
        expect(service.todos).not.toContain(mockAllTodos[1]);
    });

    it('should return todo by specific id', () => {
        const id = mockAllTodos[2].id;
        const todo = service.getById(id);
        expect(todo.id).toEqual(mockAllTodos[2].id);
        expect(todo).toEqual(mockAllTodos[2]);
    });

    it('should set todo as completed', () => {
        const todoInserted = service.addTodo(mockTodo);
        const todo = service.toggleCompleted(todoInserted.id, true);
        expect(todo.isCompleted).toBe(true);
    });

    it('should set todo as uncompleted', () => {
        const todoInserted = service.addTodo(mockTodo);
        const todo = service.toggleCompleted(todoInserted.id, false);
        expect(todo.isCompleted).toBe(false);
    });

    it('should update the id of a todo', () => {
        const todoInserted = service.addTodo(mockTodo);
        todoInserted.id = 'xxx';
        const todo = service.updateId(todoInserted, todoInserted.id);
        expect(todo.id).toBe('xxx');
    });
});
