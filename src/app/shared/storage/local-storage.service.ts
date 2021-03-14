import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/classes/storage.service';

@Injectable()
export class LocalStorageService extends StorageService {

  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data && JSON.parse(data);
  }

  setData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
