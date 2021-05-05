import { SearchConfig } from 'src/app/shared/search-config/search-config-token';

export const SEARCH_CONFIG_TODO: SearchConfig<string> = {
  key: 'todo-search',
  initialValue: ''
};

export const SEARCH_CONFIG_TODO_EXAMPLE: SearchConfig<string> = {
  key: 'todo-search-example',
  initialValue: 'initial value'
};
