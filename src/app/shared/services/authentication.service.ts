import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UsersModel} from '../models/users.model';
import {catchError, map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable()
export class AuthenticationService {

  public configObservable = new Subject<UsersModel>();

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:8080/users/authenticate', { email: email, password: password })
      .pipe(map(user => {
        this.configObservable.next(user);
        return user;
      }));
  }

  changeUserStatus() {

  }


  logout() {
    // remove user from local storage to log user out
    window.sessionStorage.removeItem('currentUser');
  }

}
