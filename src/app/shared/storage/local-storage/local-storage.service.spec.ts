import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

let service: LocalStorageService;
describe('LocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [LocalStorageService],
  }));

  beforeEach(() => {
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getData with correct values', () => {
    const getItemSpy = spyOn(localStorage, 'getItem');
    service.getData('key');
    expect(getItemSpy).toHaveBeenCalledWith('key');
  });

  it('should getData return undefined when there is no one value', () => {
    spyOn(localStorage, 'getItem').and.returnValue(undefined);
    const value = service.getData('key');
    expect(value).toBe(undefined);
  });

  it('should getData return parsed value', () => {
    const jsonData = JSON.stringify({ data: 'value' });
    spyOn(localStorage, 'getItem').and.returnValue(jsonData);
    const value = service.getData('key');
    expect(value).toEqual(JSON.parse(jsonData));
  });

  it('should call setData with correct values', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    service.setData('key', 'value');
    expect(setItemSpy).toHaveBeenCalledWith('key', JSON.stringify('value'));
  });
});
