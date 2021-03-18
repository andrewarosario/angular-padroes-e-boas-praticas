import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../shared/storage/local-storage.service';
import { StorageService } from './classes/storage.service';
import { ErrorHandlerModule } from './errors/error-handler.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ErrorHandlerModule,
  ],
  providers: [
    LocalStorageService,
    {
      provide: StorageService,
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
