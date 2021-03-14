import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.css']
})
export class TodoAddFormComponent {

  @Input() todoAddForm: FormControl;
  @Output() addTodo = new EventEmitter<string>();

}
