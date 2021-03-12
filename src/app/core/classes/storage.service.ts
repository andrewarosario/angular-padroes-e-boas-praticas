export abstract class StorageService {
  abstract getData(key: string): any;
  abstract setData(key: string, value: any): void;
}
