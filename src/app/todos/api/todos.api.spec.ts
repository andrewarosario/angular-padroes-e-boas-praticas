import { TestBed, inject } from '@angular/core/testing';

import { TodosApi } from './todos.api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockTodo } from '../mocks/todos.mock';

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
  })

  afterEach(() => {
      httpTestingController.verify();
  });


  it('should be created', () => {
      expect(service).toBeTruthy();
  })

  describe('#create', () => {
      it('returned Promise should match the right data', () => {
        service.create(mockTodo)
            .then(todo => {
                expect(todo.title).toEqual(mockTodo.title)
            });

        const req = httpTestingController.expectOne('https://5c6716e624e2140014f9ee66.mockapi.io/todo/todos');
        expect(req.request.method).toEqual('POST');
        req.flush(mockTodo);
      });
  });
});
