import { Injectable } from '@angular/core';
import { Todo } from './models/todo.model';
import { TodosApi } from './api/todos.api';
import { TodosState } from './state/todos.state';
import { Observable } from 'rxjs';
import { uuid } from '../shared/helpers/uuid';

@Injectable({
  providedIn: 'root'
})
export class TodosFacade {

  constructor(
    private api: TodosApi,
    private state: TodosState
  ) {
    this.loadAll();
  }

  get completedTodos$(): Observable<Todo[]> {
    return this.state.completedTodos$;
  }

  get uncompletedTodos$(): Observable<Todo[]> {
    return this.state.uncompletedTodos$;
  }

  async loadAll() {
    this.state.todos = await this.api.getAll();
  }

  async addTodo(title: string) {

    if (title && title.length) {

      const tmpId = uuid();
      const tmpTodo = { id: tmpId, title, isCompleted: false };

      this.state.addTodo(tmpTodo);

      try {
        const todo = await this.api.create({ title, isCompleted: false });
        this.state.updateId(todo, tmpId);

      } catch (e) {
        console.error(e);
        this.state.removeTodo(tmpId);
      }
    }
  }

  async removeTodo(id: string) {

    const todo = this.state.getById(id);
    this.state.removeTodo(id);

    try {
      await this.api.remove(id);
    } catch (e) {
      console.error(e);
      this.state.addTodo(todo);
    }
  }

  async setCompleted(id: string, isCompleted: boolean) {

    this.state.setCompleted(id, isCompleted);

    try {
      await this.api.setCompleted(id, isCompleted);
    } catch (e) {
      console.error(e);
      this.state.setCompleted(id, !isCompleted);
    }
  }

}
