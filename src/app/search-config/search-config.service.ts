import { Inject, Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/classes/storage.service';
import { SearchConfig, SEARCH_CONFIG } from 'src/app/core/tokens/search-config-token';
import { ISearchConfig } from './search-config';

@Injectable()
export class SearchConfigService<T> implements ISearchConfig<T> {

  constructor(
    private storageService: StorageService,
    @Inject(SEARCH_CONFIG) private searchConfig: SearchConfig<T>
  ) { }

  updateSearch(value: T): void {
    this.storageService.setData(this.searchConfig.key, value);
  }

  getInitialValue(): T {
    return this.storageService.getData(this.searchConfig.key) || this.searchConfig.initialValue;
  }
}
