import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  handleError(error: HttpErrorResponse) {
    this.toastr.error('Unknown error  ', error.status.toString());
    return throwError(error);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError( (error: HttpErrorResponse) => {
        let errMsg = '';
        // Client Side Error
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.error.message}`;
          this.toastr.error('Something went wrong. Check your internet connection  ', error.status.toString());
        } else {
          // Server Side Error
          if (error.status === 0) {
            errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            this.toastr.error('Unknown error  ', error.status.toString());
          } else if (error.status === 401) {
            this.toastr.error('Usfdffsdr  ', error.status.toString());
          }
        }
        return throwError(errMsg);
      })
    );
  }
}
