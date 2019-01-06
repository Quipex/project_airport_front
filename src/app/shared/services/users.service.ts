import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {BaseService} from './baseService.service';
import {BaseEntityModel} from '../models/baseEntity.model';
import {FilterAndSortWrapperModel} from "../models/filterAndSortWrapper.model";
import {ResponseFilteringWrapperModel} from "../models/responseFilteringWrapper.model";

@Injectable()
export class UsersService implements BaseService {

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

  getCountOfItems() {
    return this.http.get('http://localhost:8080/users/count', this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(`http://localhost:8080/users/page=${page}`, this.httpOptions);
  }

  getTenUsersWithSearch(search: any, page: number) {
    return this.http.get(`http://localhost:8080/users/search=${search}/page=${page}`, this.httpOptions);
  }

  addItem(item: BaseEntityModel) {
    return this.http.post('http://localhost:8080/users', item, this.httpOptions);
  }

  registrateNewUser(item: BaseEntityModel) {
    return this.http.post('http://localhost:8080/registrate', item, this.httpOptions);
  }

  editItem(id: number, item: BaseEntityModel) {
    return this.http.put(`http://localhost:8080/users/${id}`, item, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(`http://localhost:8080/users/${id}`, this.httpOptions);
  }

  sortUsersBy(field: string, order: boolean) {
    if (order) {
      return this.http.get(`http://localhost:8080/users/sortAscBy=${field}`, this.httpOptions);
    } else if (!order) {
      return this.http.get(`http://localhost:8080/users/sortDescBy=${field}`, this.httpOptions);
    }
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.getTenUsersWithSearch(wrapper.searchString, page);
  }


}
