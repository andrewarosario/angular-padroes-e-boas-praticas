import { searchConfigFactoryToken } from 'src/app/shared/search-config/search-config-factory';
import { SEARCH_CONFIG_TODO_EXAMPLE } from '../models/search-config-todo.model';

export const SEARCH_TODOS_EXAMPLE_FACTORY = searchConfigFactoryToken(SEARCH_CONFIG_TODO_EXAMPLE);
