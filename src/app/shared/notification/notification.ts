export abstract class Notification {
  abstract success(message: string): void;
  abstract error(message: string): void;
}
