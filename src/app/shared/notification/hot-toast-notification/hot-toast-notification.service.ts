import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Notification } from '../notification';

@Injectable({
  providedIn: 'root'
})
export class HotToastNotificationService extends Notification {

  constructor(
    private toast: HotToastService
  ) {
    super();
  }

  success(message: string): void {
    this.toast.success(message);
  }

  error(message: string): void {
    this.toast.error(message);
  }
}
