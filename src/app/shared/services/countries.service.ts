import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {CountriesModel} from '../models/countries.model';
import {BaseService} from "./baseService.service";
import {FilterAndSortWrapperModel} from "../models/filterAndSortWrapper.model";

@Injectable()
export class CountriesService implements BaseService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authenticationService.getToken(),
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getCountOfItems() {
    return this.http.get('http://localhost:8080/countries/count', this.httpOptions);
  }

  getCountOfItemsByFilter(searchString: string) {
    return this.http.get(`http://localhost:8080/countries/count/search=${searchString}`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(`http://localhost:8080/countries/page=${page}`, this.httpOptions);
  }

  addItem(item: CountriesModel) {
    return this.http.post('http://localhost:8080/countries', item, this.httpOptions);
  }

  editItem(id: number, item: CountriesModel) {
    return this.http.put(`http://localhost:8080/countries/`, item, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(`http://localhost:8080/countries/${id}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(`http://localhost:8080/countries/search/page=${page}`, wrapper, this.httpOptions);
  }

}
