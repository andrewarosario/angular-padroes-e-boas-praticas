import { Inject, Injectable } from '@angular/core';
import { createTempTodo, isTodoTitleValid, Todo } from './models/todo.model';
import { TodosApi } from './api/todos.api';
import { TodosState } from './state/todos.state';
import { Observable } from 'rxjs';
import { SearchConfigService } from '../shared/search-config/services/search-config.service';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { Notification } from '../shared/notification/notification';
import { SEARCH_TODOS_EXAMPLE_FACTORY } from './factories/search-config-todos-factory';
import { SearchConfig } from '../shared/search-config/search-config-token';

@Injectable()
export class TodosFacade {

  constructor(
    private api: TodosApi,
    private state: TodosState,
    private notification: Notification,
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
      distinctUntilChanged(),
      debounceTime(300),
      switchMap(search => this.api.list(search))
    )
    .subscribe(todos => this.state.todos = todos);
  }

  addTodo(title: string): void {

    if (isTodoTitleValid(title)) {
      const tempTodo = createTempTodo(title);
      this.state.addTodo(tempTodo);

      this.api.create({ title, isCompleted: tempTodo.isCompleted })
        .subscribe(
          todo => {
            this.state.updateId(todo, tempTodo.id);
            this.notification.success(title + ' Inserted!');
          },
          error => this.state.removeTodo(tempTodo.id)
        );
    }
  }

  removeTodo(id: string): void {
    const todo = this.state.getById(id);
    this.state.removeTodo(id);

    this.api.remove(id).subscribe(
      () => this.notification.success('Todo removed!'),
      (error) => this.state.addTodo(todo)
    );
  }

  toggleCompleted(id: string, isCompleted: boolean): void {

    this.state.toggleCompleted(id, isCompleted);

    this.api.toggleCompleted(id, isCompleted)
      .subscribe(
        () => this.notification.success(`Todo ${isCompleted ? 'checked' : 'unchecked'}!`),
        (error) => this.state.toggleCompleted(id, !isCompleted)
      );
  }

}
