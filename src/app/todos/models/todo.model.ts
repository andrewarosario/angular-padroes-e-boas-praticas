import { uuid } from 'src/app/shared/helpers/uuid';

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

export type TodoInsert = Omit<Todo, 'id'>;

export function createTempTodo(title: string): Todo {
  return {
    id: uuid(),
    title,
    isCompleted: false
  };
}

export function isTodoTitleValid(title: string): boolean {
  return Boolean(title && title.length);
}
