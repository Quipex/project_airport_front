import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private toastService: ToastrService,
    private router: Router
  ) {
  }

  showWarningToast(error: HttpErrorResponse) {
    this.toastService.warning(error.error.message, 'Warning');
  }

  showErrorToast(error: HttpErrorResponse) {
    this.toastService.error('Something went wrong. Please try again later.', 'Error');
  }

  showErrorToastrWithCustomMessage(message: string) {
    this.toastService.error(message);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retry will repeat request if catch error response
      retry(1),
      catchError((error: HttpErrorResponse) => {
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
              this.toastService.error('Unknown error');
            } else if ((error.status / 100) >= 4 && (error.status / 100) < 5) {
              if (error.error.message === 'Unauthorized') {
                window.localStorage.removeItem('currentUser');
                this.router.navigateByUrl('login');
              } else if (error.error.message === null || error.error.message === '') {
                this.showErrorToast(error);
              }
              errMsg = `Error: ${error.message}`;
              this.showWarningToast(error);
            } else if ((error.status / 100) >= 5) {
              if (error.error.debugMessage === 'Sorry, but you can\'t delete this item') {
                this.showErrorToastrWithCustomMessage('Sorry, but you can\'t delete this item');
              } else {
                errMsg = `Error: ${error.message}`;
                this.showErrorToast(error);
              }
            }
          }
        }
        return throwError(errMsg);
      })
    );
  }
}
