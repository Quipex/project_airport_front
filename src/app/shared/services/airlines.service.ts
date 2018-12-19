import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {BaseService} from './baseService.service';
import {BaseEntityModel} from '../models/baseEntity.model';

@Injectable()
export class AirlinesService implements BaseService {

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
    return this.http.get('http://localhost:8080/airlines/count', this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(`http://localhost:8080/airlines/page=${page}`, this.httpOptions);
  }

  addItem(item: BaseEntityModel) {
    return this.http.post('http://localhost:8080/airlines', item, this.httpOptions);
  }

  editItem(id: number, item: BaseEntityModel) {
    return this.http.put(`http://localhost:8080/airlines`, item, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(`http://localhost:8080/airlines/${id}`, this.httpOptions);
  }

}
