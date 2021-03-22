import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Notification } from 'src/app/shared/notification/notification';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private notification: Notification
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((httpError: HttpErrorResponse) => {
        console.error('Error from interceptor', httpError);
        this.notification.error(httpError.error || 'An unexpected error occurred!');
        return throwError(httpError);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
