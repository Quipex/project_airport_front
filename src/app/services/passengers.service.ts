import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {PassengerPassportModel} from '../shared/models/entity/users/passengers/passengerPasport.model';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';

@Injectable()
export class PassengersService {

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

  getPassengersByUserLogin(userLogin: string, page: number) {
    return this.http.get(`http://localhost:8080/passengers/userLogin=${userLogin}/page=${page}`, this.httpOptions);
  }

  savePassengerAndPassport(userLogin: string, wrapper: PassengerPassportModel) {
    return this.http.post(`http://localhost:8080/passengers/userLogin=${userLogin}`, wrapper, this.httpOptions);
  }

  search(userLogin: string, page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(`http://localhost:8080/passengers/userLogin=${userLogin}/search/page=${page}`, wrapper, this.httpOptions);
  }

  deleteItems(psgId: number, pstId: number) {
    return this.http.delete(`http://localhost:8080/passengers/passenger=${psgId}/passport=${pstId}`, this.httpOptions);
  }

  getAllByUserLogin(userLogin: string) {
    return this.http.get(`http://localhost:8080/passengers/userLogin=${userLogin}`, this.httpOptions);
  }
}
