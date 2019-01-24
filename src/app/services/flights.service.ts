import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FlightsModel} from '../shared/models/entity/flight/flights.model';
import {BaseService} from './baseService.service';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class FlightsService implements BaseService {

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

  getFlightsByUserLogin(userLogin: string, page: number) {
    return this.http.get(API_URL + `/user-flights/userLogin=${userLogin}/page=${page}`, this.httpOptions);
  }


  getCountOfItems() {
    return this.http.get(API_URL + `/flights/count`, this.httpOptions);
  }

  getCountOfItemsByFilter(searchString: string) {
    return this.http.get(API_URL + `/flights/count/search=${searchString}`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(API_URL + `/flights/page=${page}`, this.httpOptions);
  }

  addItem(item: FlightsModel) {
    return this.http.post(API_URL + `/flights`, item, this.httpOptions);
  }

  editItem(id: number, item: FlightsModel) {
    return this.http.put(API_URL + `/flights`, item, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(API_URL + `/flights/${id}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(API_URL + `/flights/search/page=${page}`, wrapper, this.httpOptions);
  }
}
