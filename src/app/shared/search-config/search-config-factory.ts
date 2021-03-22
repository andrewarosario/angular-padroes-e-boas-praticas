import { inject, InjectionToken } from '@angular/core';
import { SearchConfig } from './search-config-token';
import { LocalStorageService } from '../storage/local-storage/local-storage.service';
import { SearchConfigService } from './search-config.service';

export function searchConfigFactory<T>(searchConfig: SearchConfig<T>): InjectionToken<SearchConfigService<T>> {
  return new InjectionToken('SEARCH_CONFIG_FACTORY', {
    factory() {
      const storageService = inject(LocalStorageService);
      return new SearchConfigService(storageService, searchConfig);
    }
  });
}
