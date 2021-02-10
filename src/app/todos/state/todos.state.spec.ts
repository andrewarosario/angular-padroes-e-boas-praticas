import { TodosState } from "./todos.state";
import { TestBed } from '@angular/core/testing';
import { mockAllTodos, mockUncompletedTodos, mockCompletedTodos } from '../mocks/todos.mock';

describe('TodosState', () => {
    let service: TodosState;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [TodosState],
        });
    });

    beforeEach(() => {
        service = TestBed.get(TodosState);
        service.todos = mockAllTodos;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an Observable of all todos', () => {
        service.todos$.subscribe(todos => {
            expect(todos).toEqual(mockAllTodos);
        })
    });

    it('should return an Observable of all uncompleted todos', done => {
        service.uncompletedTodos$.subscribe(todos => {
            expect(todos).toEqual(mockUncompletedTodos);
            done();
        })
    });

    it('should return an Observable of all completed todos', done => {
        service.completedTodos$.subscribe(todos => {
            expect(todos).toEqual(mockCompletedTodos);
            done();
        })
    });


});