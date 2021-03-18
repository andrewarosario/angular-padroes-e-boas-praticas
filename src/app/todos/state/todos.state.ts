import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({providedIn: 'root'})
export class TodosState {

  // tslint:disable-next-line:variable-name
  private readonly _todos = new BehaviorSubject<Todo[]>([]);

  public get todos$(): Observable<Todo[]> {
    return this._todos.asObservable();
  }

  public get completedTodos$(): Observable<Todo[]> {
    return this.todos$.pipe(
      map(todos => todos.filter(todo => todo.isCompleted))
    );
  }

  public get uncompletedTodos$(): Observable<Todo[]> {
    return this.todos$.pipe(
      map(todos => todos.filter(todo => !todo.isCompleted))
    );
  }

  get todos(): Todo[] {
    return this._todos.getValue();
  }

  public getById(id: string): Todo {
    return this.todos.find(t => t.id === id);
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set todos(val: Todo[]) {
    this._todos.next(val);
  }

  public addTodo(todo: Todo): Todo {
    const currentValue = this.todos;
    this.todos = [ ...currentValue, todo ];
    return todo;
  }

  public removeTodo(id: string): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  public toggleCompleted(id: string, isCompleted: boolean): Todo {
    const todo = this.getById(id);

    if (todo) {
      const index = this.todos.indexOf(todo);

      this.todos[index] = {
        ...todo,
        isCompleted
      };

      this.todos = [...this.todos];
      return this.todos[index];
    }
  }

  public updateId(todo: Todo, idTmp: string): Todo {
    const index = this.todos.indexOf(this.getById(idTmp));
    this.todos[index] = {
      ...todo
    };

    this.todos = [...this.todos];
    return this.todos[index];
  }
}
