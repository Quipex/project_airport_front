import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UsersModel} from '../models/users.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable, Subject} from 'rxjs';
import {AuthResponceModel} from '../models/authResponce.model';

@Injectable()
export class AuthenticationService {

  private authUrl = 'http://localhost:8080/auth';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private data;
  private error;

  public configObservable = new Subject<UsersModel>();

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    return this.http.post(this.authUrl, JSON.stringify({email: email, password: password}), this.httpOptions);
      // .pipe(map((response: Response) => {
      //   // login successful if there's a jwt token in the response
      //
      //   let data = new AuthResponceModel().fromJSON(response);
      //   if (data.token) {
      //     // store username and jwt token in local storage to keep user logged in between page refreshes
      //     localStorage.setItem('currentUser', JSON.stringify({ email: email, token: data.token }));
      //
      //     // return true to indicate successful login
      //     return true;
      //   } else {
      //
      //     // return false to indicate failed login
      //     return false;
      //   }
      // }));
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? token : "";
  }


  logout() {
    // remove user from local storage to log user out
    window.localStorage.removeItem('currentUser');
  }

}
