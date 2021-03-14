export interface ISearchConfig<T> {
  updateSearch(value: T): void;
  getInitialValue(): T;
}
