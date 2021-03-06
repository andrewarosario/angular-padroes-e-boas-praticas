import { Inject, Injectable } from '@angular/core';
import { Todo } from './models/todo.model';
import { TodosApi } from './api/todos.api';
import { TodosState } from './state/todos.state';
import { Observable } from 'rxjs';
import { uuid } from '../shared/helpers/uuid';
import { SearchConfigService } from '../search-config/search-config.service';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { SEARCH_TODOS_EXAMPLE_FACTORY } from './models/search-config-todo.model';

@Injectable()
export class TodosFacade {

  constructor(
    private api: TodosApi,
    private state: TodosState,
    private searchConfigService: SearchConfigService<string>,
    @Inject(SEARCH_TODOS_EXAMPLE_FACTORY) private searchConfigExampleFactory: SearchConfigService<string>
  ) {
    /*
    Duas maneiras de injetar o SearchConfigService
    1 - Injetar somente o serviço e criar as configurações no TodosModule:
      SearchConfigModule.forRoot(SEARCH_CONFIG_TODO),

    2 - Criar uma factory (SEARCH_TODOS_EXAMPLE_FACTORY) com base na searchConfigFactory
       ela retornará um InjectionToken com as dependências injetadas
    */
  }

  completedTodos$: Observable<Todo[]> = this.state.completedTodos$;
  uncompletedTodos$: Observable<Todo[]> = this.state.uncompletedTodos$;

  listenToSearchChanges(search$: Observable<string>): void {
    search$.pipe(
      startWith(this.getInitialSearch()),
      distinctUntilChanged(),
      debounceTime(300),
      tap(search => this.searchConfigService.updateSearch(search)),
      switchMap(search => this.api.getAll(search))
    )
    .subscribe(todos => this.state.todos = todos);
  }

  getInitialSearch(): string {
    return this.searchConfigService.getInitialValue();
  }

  async addTodo(title: string): Promise<void> {

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
