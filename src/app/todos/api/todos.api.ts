import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoInsert } from '../models/todo.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosApi {

  constructor(private http: HttpClient) { }

  list(search: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiBaseUrl}/todos?search=${search}`);
  }

  create(todo: TodoInsert): Observable<Todo> {
    return this.http.post<Todo>(`${environment.apiBaseUrl}/todos`, todo);
  }

  remove(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${environment.apiBaseUrl}/todos/${id}`);
  }

  toggleCompleted(id: string, isCompleted: boolean): Observable<Todo> {
    return this.http.put<Todo>(`${environment.apiBaseUrl}/todos/${id}`, {isCompleted});
  }
}
