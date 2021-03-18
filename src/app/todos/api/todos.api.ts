import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosApi {

  private readonly apiBaseUrl = 'https://5c6716e624e2140014f9ee66.mockapi.io/todo';

  constructor(private http: HttpClient) { }

  list(search: string) {
    return this.http.get<Todo[]>(`${this.apiBaseUrl}/todos?search=${search}`).toPromise();
  }

  create(todo: Todo) {
    return this.http.post<Todo>(`${this.apiBaseUrl}/todos`, todo).toPromise();
  }

  remove(id: string) {
    return this.http.delete(`${this.apiBaseUrl}/todos/${id}`).toPromise();
  }

  setCompleted(id: string, isCompleted: boolean) {
    return this.http.put<Todo>(`${this.apiBaseUrl}/todos/${id}`, {isCompleted}).toPromise();
  }
}
