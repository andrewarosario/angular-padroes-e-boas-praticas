import { TestBed, inject } from '@angular/core/testing';

import { TodosApi } from './todos.api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockTodo, mockAllTodos } from '../mocks/todos.mock';

describe('TodosApi', () => {

  let service: TodosApi;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosApi],
      imports: [HttpClientTestingModule]
    });
  });

  beforeEach(() => {
      service = TestBed.get(TodosApi);
      httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
      httpTestingController.verify();
  });


  it('should be created', () => {
      expect(service).toBeTruthy();
  });

  describe('#getAll', () => {
    it('returned Promise should match the right data', () => {
        const searchQuery = 'search';
        service.getAll(searchQuery)
          .then(todos => {
            expect(todos[0].title).toEqual(mockAllTodos[0].title);
            expect(todos[1].title).toEqual(mockAllTodos[1].title);
          });

        const req = httpTestingController
          .expectOne(`https://5c6716e624e2140014f9ee66.mockapi.io/todo/todos?search=${searchQuery}`);
        expect(req.request.method).toEqual('GET');
        req.flush(mockAllTodos);
    });
  });

  describe('#create', async () => {
      it('returned Promise should match the right data', () => {
        service.create(mockTodo)
            .then(todo => {
                expect(todo.title).toEqual(mockTodo.title);
            });

        const req = httpTestingController.expectOne('https://5c6716e624e2140014f9ee66.mockapi.io/todo/todos');
        expect(req.request.method).toEqual('POST');
        req.flush(mockTodo);
      });
  });

  describe('#remove', async () => {
    it('returned Promise should match the right data', () => {
      service.remove(mockTodo.id)
          .then(todo => {
            expect(todo).toEqual(mockTodo);
          });

      const req = httpTestingController.expectOne(`https://5c6716e624e2140014f9ee66.mockapi.io/todo/todos/${mockTodo.id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockTodo);
    });
  });

  describe('#setCompleted', async () => {
    it('returned Promise should match the right data', () => {
      service.setCompleted(mockTodo.id, true)
          .then(todo => {
              expect(todo.id).toEqual(mockTodo.id);
              expect(todo.isCompleted).toEqual(true);
          });

      const req = httpTestingController.expectOne(`https://5c6716e624e2140014f9ee66.mockapi.io/todo/todos/${mockTodo.id}`);
      expect(req.request.method).toEqual('PUT');
      req.flush({ ...mockTodo, isCompleted: true});
    });
});

});
