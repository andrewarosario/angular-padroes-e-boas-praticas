import { Injectable } from '@angular/core';
import { Storage } from 'src/app/shared/storage/storage';

@Injectable()
export class LocalStorageService extends Storage {

  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data && JSON.parse(data);
  }

  setData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
