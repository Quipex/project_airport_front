import {Injectable} from '@angular/core';
import {BaseService} from './baseService.service';
import {BaseEntityModel} from '../shared/models/baseEntity.model';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class AirplanesService extends BaseService {

  addItem(baseEntity: BaseEntityModel) {
    return this.http.post(API_URL + `/airplanes`, baseEntity, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(API_URL + `/airplanes/${id}`, this.httpOptions);
  }

  editItem(id: number, baseEntity: BaseEntityModel) {
    return this.http.put(API_URL + `/airplanes`, baseEntity, this.httpOptions);
  }

  getCountOfItems() {
    return this.http.get(API_URL + `/airplanes/count`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(API_URL + `/airplanes/page=${page}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(API_URL + `/airplanes/search/page=${page}`, wrapper, this.httpOptions);
  }

  getItemById(id: number) {
    return this.http.get(API_URL + `/airplanes/objectId=${id}`, this.httpOptions);
  }

  getAll() {
    return this.http.get(API_URL + `/airplanes`, this.httpOptions);
  }

}
