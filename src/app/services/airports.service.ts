import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BaseService} from "./baseService.service";
import {BaseEntityModel} from "../shared/models/baseEntity.model";
import {FilterAndSortWrapperModel} from "../shared/models/filterAndSortWrapper.model";

const API_URL = environment.apiUrl;

@Injectable()
export class AirportsService extends BaseService{

  addItem(baseEntity: BaseEntityModel) {
    return this.http.post(API_URL + `/airports`, baseEntity, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(API_URL + `/airports/${id}`, this.httpOptions);
  }

  editItem(id: number, baseEntity: BaseEntityModel) {
    return this.http.put(API_URL + `/airports/`, baseEntity, this.httpOptions);
  }

  getCountOfItems() {
    return this.http.get(API_URL + `/airports/count`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(API_URL + `/airports/page=${page}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(API_URL + `/airports/search/page=${page}`, wrapper, this.httpOptions);
  }

  getAll() {
    return this.http.get(API_URL + `/airports`, this.httpOptions);
  }

}

