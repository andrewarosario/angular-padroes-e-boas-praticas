import { NgModule } from '@angular/core';
import { TodoListComponent } from './containers/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodosRoutingModule } from './todos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
