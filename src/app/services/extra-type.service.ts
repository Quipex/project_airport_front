import {Injectable} from '@angular/core';
import {ExtraTypeModel} from '../shared/models/entity/airplane/extra-type.model';
import {BaseService} from './baseService.service';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class ExtraTypeService extends BaseService {

  addItem(item: ExtraTypeModel) {
    return this.http.post(API_URL + `/extra-type`, item, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(API_URL + `/extra-type/${id}`, this.httpOptions);
  }

  editItem(id: number, item: ExtraTypeModel) {
    return this.http.put(API_URL + `/extra-type/`, item, this.httpOptions);
  }

  getCountOfItems() {
    return this.http.get(API_URL + `/extra-type/count`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(API_URL + `/extra-type/page=${page}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(API_URL + `/extra-type/search/page=${page}`, wrapper, this.httpOptions);
  }

}
