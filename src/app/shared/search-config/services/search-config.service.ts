import { Inject, Injectable } from '@angular/core';
import { Storage } from 'src/app/shared/storage/storage';
import { SearchConfig, SEARCH_CONFIG } from 'src/app/shared/search-config/search-config-token';

@Injectable()
export class SearchConfigService<T> {

  constructor(
    private storageService: Storage,
    @Inject(SEARCH_CONFIG) private searchConfig: SearchConfig<T>
  ) { }

  updateSearch(value: T): void {
    this.storageService.setData(this.searchConfig.key, value);
  }

  getInitialValue(): T {
    return this.storageService.getData(this.searchConfig.key) || this.searchConfig.initialValue;
  }
}
