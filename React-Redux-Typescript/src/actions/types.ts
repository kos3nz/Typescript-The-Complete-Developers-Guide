import { FetchTodosAction, DeleteTodoAction } from './todos';

export const ActionTypes = {
  FETCH_TODOS: 'FETCH_TODOS',
  DELETE_TODO: 'DELETE_TODO',
} as const;

export type Action = FetchTodosAction | DeleteTodoAction;
