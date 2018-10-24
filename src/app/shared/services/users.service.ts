import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UsersModel} from '../models/users.model';

@Injectable()
export class UsersService {


  constructor(
    private http: Http
  ) {}

  getAllUsers() {
    return this.http.get('http://localhost:8080/users/');
  }

  getTenUsers(page: number) {
    return this.http.get(`http://localhost:8080/users/page=${page}`);
  }

  addUser(user: UsersModel) {
    return this.http.post('http://localhost:8080/users/', user);
  }

  editUser(id: number, user: UsersModel) {
    return this.http.put(`http://localhost:8080/users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:8080/users/${id}`);
  }
}
