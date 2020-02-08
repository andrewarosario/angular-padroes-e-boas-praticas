import { Component, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { TodosFacade } from '../../todos.facade';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  @ViewChild('todoTitleInput', { static: false }) todoTitleInput: ElementRef;

  // optimization, rerenders only todos that change instead of the entire list of todos
  todosTrackFn = (i, todo) => todo.id;

  constructor(public todosFacade: TodosFacade) {}

  onAddTodo(title: string) {
    this.todosFacade.addTodo(title);
    this.todoTitleInput.nativeElement.value = '';
  }

}
