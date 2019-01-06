import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {BaseService} from './baseService.service';
import {BaseEntityModel} from '../models/baseEntity.model';
import {FilterAndSortWrapperModel} from "../models/filterAndSortWrapper.model";
import {environment} from "../../../environments/environment";

const API_URL = environment.apiUrl;

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
  ) {
  }

  getCountOfItems() {
    return this.http.get(API_URL + `/users/count`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(API_URL + `/users/page=${page}`, this.httpOptions);
  }

  getTenUsersWithSearch(search: any, page: number) {
    return this.http.get(API_URL + `/users/search=${search}/page=${page}`, this.httpOptions);
  }

  addItem(item: BaseEntityModel) {
    return this.http.post(API_URL + `/users`, item, this.httpOptions);
  }

  registrateNewUser(item: BaseEntityModel) {
    return this.http.post(API_URL + `/registrate`, item, this.httpOptions);
  }

  editItem(id: number, item: BaseEntityModel) {
    return this.http.put(API_URL + `/users/${id}`, item, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(API_URL + `/users/${id}`, this.httpOptions);
  }

  sortUsersBy(field: string, order: boolean) {
    if (order) {
      return this.http.get(API_URL + `/users/sortAscBy=${field}`, this.httpOptions);
    } else if (!order) {
      return this.http.get(API_URL + `/users/sortDescBy=${field}`, this.httpOptions);
    }
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.getTenUsersWithSearch(wrapper.searchString, page);
  }


}
