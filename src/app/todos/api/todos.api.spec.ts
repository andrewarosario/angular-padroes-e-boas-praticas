import { TestBed } from '@angular/core/testing';

import { TodosApi } from './todos.api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockTodo, mockAllTodos } from '../mocks/todos.mock';
import { environment } from 'src/environments/environment';

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
      service = TestBed.inject(TodosApi);
      httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
      httpTestingController.verify();
  });


  it('should be created', () => {
      expect(service).toBeTruthy();
  });

  describe('#list', () => {
    it('returned Observable should match the right data', () => {
        const searchQuery = 'search';
        service.list(searchQuery)
          .subscribe(todos => {
            expect(todos[0].title).toEqual(mockAllTodos[0].title);
            expect(todos[1].title).toEqual(mockAllTodos[1].title);
          });

        const req = httpTestingController
          .expectOne(`${environment.apiBaseUrl}/todos?search=${searchQuery}`);
        expect(req.request.method).toEqual('GET');
        req.flush(mockAllTodos);
    });
  });

  describe('#create', async () => {
    it('returned Observable should match the right data', () => {
      service.create(mockTodo)
          .subscribe(todo => {
              expect(todo.title).toEqual(mockTodo.title);
          });

      const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/todos`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockTodo);
    });
  });

  describe('#remove', async () => {
    it('returned Observable should match the right data', () => {
      service.remove(mockTodo.id)
          .subscribe(todo => {
            expect(todo).toEqual(mockTodo);
          });

      const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/todos/${mockTodo.id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockTodo);
    });
  });

  describe('#toggleCompleted', async () => {
    it('returned Observable should match the right data', () => {
      service.toggleCompleted(mockTodo.id, true)
          .subscribe(todo => {
              expect(todo.id).toEqual(mockTodo.id);
              expect(todo.isCompleted).toEqual(true);
          });

      const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/todos/${mockTodo.id}`);
      expect(req.request.method).toEqual('PUT');
      req.flush({ ...mockTodo, isCompleted: true});
    });
  });
});
