import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormSearchStorageDirective } from './directives/form-search-storage.directive';
import { SearchConfig, SEARCH_CONFIG } from './search-config-token';
import { SearchConfigService } from './services/search-config.service';

@NgModule({
  declarations: [ FormSearchStorageDirective ],
  exports: [ FormSearchStorageDirective ]
})
export class SearchConfigModule {
  static forRoot<T>(searchConfig: SearchConfig<T>): ModuleWithProviders<SearchConfigModule> {
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
