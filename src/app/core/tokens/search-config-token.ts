import { InjectionToken } from '@angular/core';

export interface SearchConfig<T> {
  key: string;
  initialValue: T;
}

export const SEARCH_CONFIG = new InjectionToken<SearchConfig<any>>('SEARCH_CONFIG');

