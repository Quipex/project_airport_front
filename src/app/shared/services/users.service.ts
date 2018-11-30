import {Injectable} from '@angular/core';

import {UsersModel} from '../models/users.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UsersService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authenticationService.getToken(),
      'Content-Type': 'application/json'
    })
  };


  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getCountOfUsers() {
    return this.http.get('http://localhost:8080/users/count', this.httpOptions);
  }

  getTenUsers(page: number) {
    return this.http.get(`http://localhost:8080/users/page=${page}`, this.httpOptions);
  }

  getTenUsersWithSearch(search: any, page: number) {
    return this.http.post(`http://localhost:8080/users/search/page=${page}`, search, this.httpOptions);
  }

  addUser(user: UsersModel) {
    return this.http.post('http://localhost:8080/users', user, this.httpOptions);
  }

  registrateNewUser(user: UsersModel) {
    return this.http.post('http://localhost:8080/registrate', user, this.httpOptions);
  }

  editUser(id: number, user: UsersModel) {
    return this.http.put(`http://localhost:8080/users/${id}`, user, this.httpOptions);
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:8080/users/${id}`, this.httpOptions);
  }
}
