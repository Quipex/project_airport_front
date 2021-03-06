import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsersModel} from '../shared/models/entity/users/users.model';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class AuthenticationService {

  public configObservable = new Subject<UsersModel>();
  private authUrl = API_URL + '/auth';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private data;
  private error;

  constructor(
    private http: HttpClient
  ) {
  }

  login(login: string, password: string) {

    return this.http.post(this.authUrl, JSON.stringify({login: login, password: password}), this.httpOptions);
    // .pipe(map((response: Response) => {
    //   // login successful if there's a jwt token in the response
    //
    //   let data = new AuthResponseModel().fromJSON(response);
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
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    return token ? token : '';
  }

  logout() {
    // remove user from local storage to log user out
    window.localStorage.removeItem('currentUser');
  }

}
