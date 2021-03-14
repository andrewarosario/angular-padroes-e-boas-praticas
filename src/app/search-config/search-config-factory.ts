import { inject, InjectionToken } from '@angular/core';
import { SearchConfig } from '../core/tokens/search-config-token';
import { LocalStorageService } from '../shared/storage/local-storage.service';
import { SearchConfigService } from './search-config.service';

export function searchConfigFactory<T>(searchConfig: SearchConfig<T>): InjectionToken<SearchConfigService<T>> {
  return new InjectionToken('SEARCH_CONFIG_FACTORY', {
    factory() {
      const storageService = inject(LocalStorageService);
      return new SearchConfigService(storageService, searchConfig);
    }
  });
}
