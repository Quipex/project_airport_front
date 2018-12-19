import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  showWarningToastr(error: HttpErrorResponse) {
    this.toastr.warning(error.error.message, error.status.toString());
  }

  showErrorToastr(error: HttpErrorResponse) {
    this.toastr.error(error.error.message, error.status.toString());
  }

  showErrorToastrWithCustomMessage(message: string) {
    this.toastr.error(message);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retry will repeat request if catch error response
      retry(1),
      catchError( (error: HttpErrorResponse) => {
        let errMsg = '';
        // Client Side Error
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.message}`;
          console.log(error.message);
          this.showErrorToastrWithCustomMessage('Client side error');
        } else {
          // Server Side Error
          if (!navigator.onLine) {
            this.showErrorToastrWithCustomMessage('Check your internet connection');
          } else {
            if (error.status === 0) {
              errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
              this.toastr.error('Unknown error');
            } else if ((error.status / 100) >= 4 && (error.status / 100) < 5) {
              errMsg = `Error: ${error.message}`;
              this.showWarningToastr(error);
            } else if ((error.status / 100) >= 5) {
              errMsg = `Error: ${error.message}`;
              this.showErrorToastr(error);
            }
          }
        }
        return throwError(errMsg);
      })
    );
  }
}
