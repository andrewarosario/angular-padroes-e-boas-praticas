import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { formChangesUntilDestroyed } from 'src/app/shared/helpers/form-changes-until-destroyed/form-changes-until-destroyed';
import { Todo } from '../../models/todo.model';
import { TodosFacade } from '../../todos.facade';

@UntilDestroy()
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  public todoAddForm = new FormControl('', Validators.required);
  public searchForm = new FormControl();

  // optimization, rerenders only todos that change instead of the entire list of todos
  todosTrackFn = (i, todo: Todo) => todo.id;

  constructor(public facade: TodosFacade) {}

  ngOnInit(): void {
    const search$ = formChangesUntilDestroyed(this, this.searchForm);
    this.facade.listenToSearchChanges(search$);
  }

  addTodo(title: string): void {
    this.facade.addTodo(title);
    this.todoAddForm.setValue('');
  }

}
