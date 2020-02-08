import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './containers/todo-list/todo-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
