import {Injectable} from '@angular/core';
import {CountriesModel} from '../shared/models/entity/flight/countries.model';
import {BaseService} from './baseService.service';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class CountriesService extends BaseService {

  getCountOfItems() {
    return this.http.get(API_URL + `/countries/count`, this.httpOptions);
  }

  getCountOfItemsByFilter(searchString: string) {
    return this.http.get(API_URL + `/countries/count/search=${searchString}`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(API_URL + `/countries/page=${page}`, this.httpOptions);
  }

  addItem(item: CountriesModel) {
    return this.http.post(API_URL + `/countries`, item, this.httpOptions);
  }

  editItem(id: number, item: CountriesModel) {
    return this.http.put(API_URL + `/countries/`, item, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(API_URL + `/countries/${id}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(API_URL + `/countries/search/page=${page}`, wrapper, this.httpOptions);
  }

}
