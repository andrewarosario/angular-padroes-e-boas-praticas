import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/classes/storage.service';

@Injectable()
export class LocalStorageService extends StorageService {

  getData(key: string): any {
    return localStorage.getItem(key);
  }

  setData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
