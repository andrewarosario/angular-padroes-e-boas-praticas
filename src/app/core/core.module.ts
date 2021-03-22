import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../shared/storage/local-storage/local-storage.service';
import { Storage } from '../shared/storage/storage';
import { ErrorHandlerModule } from './errors/error-handler.module';
import { NotificationModule } from '../shared/notification/notification.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ErrorHandlerModule,
    NotificationModule
  ],
  providers: [
    LocalStorageService,
    {
      provide: Storage,
      useClass: LocalStorageService
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {

    if (parentModule) {
      throw new Error('CoreModule já foi instanciado. Importe-o somente em AppModule.');
    }
  }
}
