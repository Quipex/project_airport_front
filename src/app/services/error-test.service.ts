import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class ErrorTestService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authenticationService.getToken(),
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  invokeItem(id: number) {
    return this.http.get(API_URL + `/error/${id}`, this.httpOptions);
  }

  getAll() {
    return this.http.get(API_URL + `/error/`, this.httpOptions);
  }

}
