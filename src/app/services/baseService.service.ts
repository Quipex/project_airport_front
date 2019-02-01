import {Injectable} from '@angular/core';
import {BaseEntityModel} from '../shared/models/baseEntity.model';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable()
export abstract class BaseService {

  API_URL = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authenticationService.getToken(),
      'Content-Type': 'application/json'
    })
  };

  constructor(
    protected http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  abstract getCountOfItems();

  abstract getTenItems(page: number);

  abstract addItem(baseEntity: BaseEntityModel);

  abstract editItem(id: number, baseEntity: BaseEntityModel);

  abstract deleteItem(id: number);

  abstract search(page: number, wrapper: FilterAndSortWrapperModel);
}
