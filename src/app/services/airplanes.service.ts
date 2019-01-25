import {Injectable} from '@angular/core';
import {BaseService} from './baseService.service';
import {BaseEntityModel} from '../shared/models/baseEntity.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class AirplanesService implements BaseService {

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


}
