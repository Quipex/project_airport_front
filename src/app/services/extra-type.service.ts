import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {ExtraTypeModel} from '../shared/models/entity/airplane/extra-type.model';
import {BaseService} from './baseService.service';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class ExtraTypeService implements BaseService {

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
