import { SearchConfig } from 'src/app/core/tokens/search-config-token';
import { searchConfigFactory } from 'src/app/search-config/search-config-factory';

export const SEARCH_CONFIG_TODO: SearchConfig<string> = {
  key: 'todo-search',
  initialValue: ''
};

export const SEARCH_TODOS_EXAMPLE_FACTORY = searchConfigFactory({
  key: 'example',
  initialValue: 'initial example',
});

