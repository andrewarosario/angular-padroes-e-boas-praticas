import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpErrorInterceptor } from './http-error.interceptor';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class ErrorHandlerModule {}
