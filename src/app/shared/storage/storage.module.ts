import { NgModule } from '@angular/core';
import { Storage } from './storage';
import { LocalStorageService } from './local-storage/local-storage.service';

@NgModule({
  providers: [
    LocalStorageService,
    {
      provide: Storage,
      useClass: LocalStorageService
    }
  ]
})
export class StorageModule {}
