import { searchConfigFactory } from 'src/app/shared/search-config/search-config-factory';

export const SEARCH_TODOS_EXAMPLE_FACTORY = searchConfigFactory({
  key: 'example',
  initialValue: 'initial example',
});
