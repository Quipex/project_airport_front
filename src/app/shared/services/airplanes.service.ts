import {Injectable} from "@angular/core";
import {BaseService} from "./baseService.service";
import {BaseEntityModel} from "../models/baseEntity.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {FilterAndSortWrapperModel} from "../models/filterAndSortWrapper.model";

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
  ) {}


  addItem(baseEntity: BaseEntityModel) {
    return this.http.post('http://localhost:8080/airplanes', baseEntity, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(`http://localhost:8080/airplanes/${id}`, this.httpOptions);
  }

  editItem(id: number, baseEntity: BaseEntityModel) {
    return this.http.put(`http://localhost:8080/airplanes`, baseEntity, this.httpOptions);
  }

  getCountOfItems() {
    return this.http.get('http://localhost:8080/airplanes/count', this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(`http://localhost:8080/airplanes/page=${page}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(`http://localhost:8080/airplanes/search/page=${page}`, wrapper, this.httpOptions);
  }



}
