import {Injectable} from "@angular/core";
import {BaseService} from "./baseService.service";
import {FilterAndSortWrapperModel} from "../shared/models/filterAndSortWrapper.model";
import {BaseEntityModel} from "../shared/models/baseEntity.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_URL = environment.apiUrl;

@Injectable()
export class SeatTypeService implements BaseService {

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
      .pipe(map((res:Response) => res.json()));
  }

  getAllItems() {
    return this.http.get(API_URL + `/seat-type`, this.httpOptions);
  }
}
