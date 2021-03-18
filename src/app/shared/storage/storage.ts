export abstract class Storage {
  abstract getData(key: string): any;
  abstract setData(key: string, value: any): void;
}
