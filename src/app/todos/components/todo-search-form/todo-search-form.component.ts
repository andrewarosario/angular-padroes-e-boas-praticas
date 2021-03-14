import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-search-form',
  templateUrl: './todo-search-form.component.html',
  styleUrls: ['./todo-search-form.component.css']
})
export class TodoSearchFormComponent {
  @Input() todoSearchForm: FormControl;
}
