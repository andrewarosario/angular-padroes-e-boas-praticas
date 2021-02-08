import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.css']
})
export class TodoAddFormComponent implements OnInit {

  @Input() todoAddForm: FormControl;
  @Output() onAddTodo = new EventEmitter<string>();

  ngOnInit() {
  }

}
