// error-handling.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private notify: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Proceed with the HTTP request and handle errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
            errorMessage = `Error: ${error.error.message}`;
            this.notify.error(errorMessage);
        } else {
          // Server-side error
          if (error.status === 0) {
            errorMessage =
              'Unable to connect to the Server. Please check your internet connection or try again';

            this.notify.error(errorMessage);
          } else {
            this.notify.error('Something went wrong. Please try again..');
          }
        }
        return throwError(error);
      })
    );
  }
}
