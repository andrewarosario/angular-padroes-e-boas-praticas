import { of } from 'rxjs';
import { mockCompletedTodos, mockUncompletedTodos } from './todos.mock';
import { TodosFacade } from '../todos.facade';

export const todosFacadeStub: Partial<TodosFacade> = {
    completedTodos$:  of(mockCompletedTodos),
    uncompletedTodos$: of(mockUncompletedTodos),
    loadAll: async () => {},
    setCompleted: async (id: string, isCompleted: boolean) => {},
    removeTodo: async (id: string) => {}
}