import { ModuleWithProviders, NgModule } from '@angular/core';
import { SearchConfig, SEARCH_CONFIG } from '../core/tokens/search-config-token';
import { SearchConfigService } from './search-config.service';

@NgModule({})
export class SearchConfigModule {
  static forRoot<T>(searchConfig: SearchConfig<T>): ModuleWithProviders {
    return {
      ngModule: SearchConfigModule,
      providers: [
        SearchConfigService,
        {
          provide: SEARCH_CONFIG,
          useValue: searchConfig
        }
      ]
    };
  }
}
