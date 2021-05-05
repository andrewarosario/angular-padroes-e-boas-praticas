import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-search-form',
  templateUrl: './todo-search-form.component.html',
  styleUrls: ['./todo-search-form.component.css'],
  // providers: [{
  //   provide: SearchConfigService,
  //   useFactory: () => searchConfigFactory(SEARCH_CONFIG_TODO_EXAMPLE)
  // }]
})
export class TodoSearchFormComponent {
  @Input() todoSearchForm: FormControl;
}
