import { of } from 'rxjs';
import { mockCompletedTodos, mockUncompletedTodos } from './todos.mock';
import { TodosFacade } from '../todos.facade';

export const todosFacadeStub: Partial<TodosFacade> = {
    completedTodos$:  of(mockCompletedTodos),
    uncompletedTodos$: of(mockUncompletedTodos),
    toggleCompleted: (id: string, isCompleted: boolean) => {},
    removeTodo: async (id: string) => {},
    addTodo: async (title: string) => {},
    getInitialSearch: (): string => '',
    listenToSearchChanges: () => {},
};
