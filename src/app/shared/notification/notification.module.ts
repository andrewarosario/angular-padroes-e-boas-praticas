import { NgModule } from '@angular/core';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Notification } from './notification';

@NgModule({
  imports: [
    HotToastModule.forRoot()
  ],
  providers: [
    {
      provide: Notification,
      useClass: HotToastService
    }
  ]
})
export class NotificationModule {}
