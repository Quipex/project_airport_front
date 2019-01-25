import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {BaseService} from './baseService.service';
import {BaseEntityModel} from '../shared/models/baseEntity.model';
import {FilterAndSortWrapperModel} from "../shared/models/filterAndSortWrapper.model";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable()
export class AirlinesService implements BaseService {

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
    return this.http.get(API_URL + `/airlines/count`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(API_URL + `/airlines/page=${page}`, this.httpOptions);
  }

  addItem(item: BaseEntityModel) {
    return this.http.post(API_URL + `/airlines`, item, this.httpOptions);
  }

  editItem(id: number, item: BaseEntityModel) {
    return this.http.put(API_URL + `/airlines/`, item, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(API_URL + `/airlines/${id}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(API_URL + `/airlines/search/page=${page}`, wrapper, this.httpOptions);
  }

  getItemById(id: number) {
    return this.http.get(API_URL + `/airlines/objectId=${id}`, this.httpOptions);
  }

}
