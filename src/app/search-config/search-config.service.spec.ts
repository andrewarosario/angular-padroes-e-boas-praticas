import { TestBed } from '@angular/core/testing';
import { StorageService } from '../core/classes/storage.service';
import { LocalStorageService } from '../shared/storage/local-storage/local-storage.service';
import { SEARCH_CONFIG_TODO } from '../todos/models/search-config-todo.model';
import { SearchConfigModule } from './search-config.module';
import { SearchConfigService } from './search-config.service';

let service: SearchConfigService<any>;
let storageService: StorageService;

describe('SearchConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      SearchConfigModule.forRoot(SEARCH_CONFIG_TODO)
    ],
    providers: [
      StorageService,
      LocalStorageService,
      { provide: StorageService, useClass: LocalStorageService }
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(SearchConfigService);
    storageService = TestBed.get(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call updateSearch with correct values', () => {
    const setDataSpy = spyOn(storageService, 'setData');
    service.updateSearch('value');
    expect(setDataSpy).toHaveBeenCalledWith(SEARCH_CONFIG_TODO.key, 'value');
  });

  it('should return default value when storageService.getData returns undefined', () => {
    spyOn(storageService, 'getData').and.returnValue(undefined);
    const value = service.getInitialValue();
    expect(value).toEqual(SEARCH_CONFIG_TODO.initialValue);
  });

  it('should return value of storageService.getData when returns data', () => {
    spyOn(storageService, 'getData').and.returnValue('test');
    const value = service.getInitialValue();
    expect(value).toBe('test');
  });
});
