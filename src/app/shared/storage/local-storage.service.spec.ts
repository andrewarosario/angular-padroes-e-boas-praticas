import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

let service: LocalStorageService;
describe('LocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [LocalStorageService],
  }));

  beforeEach(() => {
    service = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getData with correct values', () => {
    const getItemSpy = spyOn(localStorage, 'getItem');
    service.getData('key');
    expect(getItemSpy).toHaveBeenCalledWith('key');
  });

  it('should call setData with correct values', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    service.setData('key', 'value');
    expect(setItemSpy).toHaveBeenCalledWith('key', JSON.stringify('value'));
  });
});
