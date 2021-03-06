import {Injectable} from '@angular/core';
import {BaseService} from './baseService.service';
import {BaseEntityModel} from '../shared/models/baseEntity.model';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {environment} from '../../environments/environment';
import {ChangePasswordModel} from '../shared/models/changePassword.model';

const API_URL = environment.apiUrl;

@Injectable()
export class UsersService extends BaseService {

  getCountOfItems() {
    return this.http.get(API_URL + `/users/count`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(API_URL + `/users/page=${page}`, this.httpOptions);
  }

  addItem(item: BaseEntityModel) {
    return this.http.post(API_URL + `/users`, item, this.httpOptions);
  }

  editItem(id: number, item: BaseEntityModel) {
    return this.http.put(API_URL + `/users/`, item, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(API_URL + `/users/${id}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(API_URL + `/users/search/page=${page}`, wrapper, this.httpOptions);
  }

  registerNewUser(item: BaseEntityModel) {
    return this.http.post(API_URL + `/register`, item, this.httpOptions);
  }

  getUserByLogin(login: string) {
    return this.http.get(API_URL + `/users/login=${login}`, this.httpOptions);
  }

  changePassword(login: string, passwordModel: ChangePasswordModel) {
    return this.http.post(API_URL + `/users/changePassword/login=${login}`, passwordModel, this.httpOptions);
  }

}
