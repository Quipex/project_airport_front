import {Injectable} from '@angular/core';
import {BaseService} from './baseService.service';
import {BaseEntityModel} from '../shared/models/baseEntity.model';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';

@Injectable()
export class AirlinesService extends BaseService {

  getCountOfItems() {
    return this.http.get(this.API_URL + `/airlines/count`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(this.API_URL + `/airlines/page=${page}`, this.httpOptions);
  }

  addItem(item: BaseEntityModel) {
    return this.http.post(this.API_URL + `/airlines`, item, this.httpOptions);
  }

  editItem(id: number, item: BaseEntityModel) {
    return this.http.put(this.API_URL + `/airlines/`, item, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(this.API_URL + `/airlines/${id}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(this.API_URL + `/airlines/search/page=${page}`, wrapper, this.httpOptions);
  }

  getItemById(id: number) {
    return this.http.get(this.API_URL + `/airlines/objectId=${id}`, this.httpOptions);
  }

  getAll() {
    return this.http.get(this.API_URL + `/airlines`, this.httpOptions);
  }

}
