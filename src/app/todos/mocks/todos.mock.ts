import { Todo } from '../models/todo.model';

export const mockTodo: Todo = {
    id: '000', title: 'test1', isCompleted: false
};

export const mockUncompletedTodos: Todo[] = [
    { id: '111', title: 'test1', isCompleted: false },
    { id: '222', title: 'test2', isCompleted: false },
    { id: '333', title: 'test3', isCompleted: false },
];

export const mockCompletedTodos: Todo[] = [
    { id: '444', title: 'test4', isCompleted: true },
    { id: '555', title: 'test5', isCompleted: true },
];

export const mockAllTodos: Todo[] = [ ...mockUncompletedTodos, ...mockCompletedTodos ];
