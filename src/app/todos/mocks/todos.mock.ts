import { of, Observable } from "rxjs";
import { Todo } from '../models/todo.model';

export const mockUncompletedTodos$: Observable<Todo[]> = of([
    { id: '111', title: 'test1', isCompleted: false },
    { id: '222', title: 'test2', isCompleted: false },
    { id: '333', title: 'test3', isCompleted: false },
]);

export const mockCompletedTodos$: Observable<Todo[]> = of([
    { id: '444', title: 'test4', isCompleted: true },
    { id: '555', title: 'test5', isCompleted: true },
]);