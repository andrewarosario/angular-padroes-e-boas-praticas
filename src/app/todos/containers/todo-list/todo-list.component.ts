import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { TodosFacade } from '../../todos.facade';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit, OnDestroy {

  public todoAddForm = new FormControl('', Validators.required);
  public searchForm = new FormControl(this.facade.getInitialSearch());

  // optimization, rerenders only todos that change instead of the entire list of todos
  todosTrackFn = (i, todo: Todo) => todo.id;

  constructor(public facade: TodosFacade) {}

  ngOnInit(): void {
    const search$ = this.valueChangesSearch();
    this.facade.listenToSearchChanges(search$);
  }

  ngOnDestroy(): void {}

  addTodo(title: string): void {
    this.facade.addTodo(title);
    this.todoAddForm.setValue('');
  }

  private valueChangesSearch(): Observable<string> {
    return this.searchForm.valueChanges.pipe(untilDestroyed(this));
  }

}
