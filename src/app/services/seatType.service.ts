import {Injectable} from '@angular/core';
import {BaseService} from './baseService.service';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {BaseEntityModel} from '../shared/models/baseEntity.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable()
export class SeatTypeService extends BaseService {

  addItem(baseEntity: BaseEntityModel) {
    return this.http.post(API_URL + `/seat-type`, baseEntity, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(API_URL + `/seat-type/${id}`, this.httpOptions);
  }

  editItem(id: number, baseEntity: BaseEntityModel) {
    return this.http.put(API_URL + `/seat-type/`, baseEntity, this.httpOptions);
  }

  getCountOfItems() {
    return this.http.get(API_URL + `/seat-type/count`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(API_URL + `/seat-type/page=${page}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(API_URL + `/seat-type/search/page=${page}`, wrapper, this.httpOptions);
  }

  getItemById(id: number) {
    return this.http.get(API_URL + `/seat-type/objectId=${id}`, this.httpOptions) // ...using post request
      .pipe(map((res: Response) => res.json()));
  }

  getAllItems() {
    return this.http.get(API_URL + `/seat-type`, this.httpOptions);
  }
}
