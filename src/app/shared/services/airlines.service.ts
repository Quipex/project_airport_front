import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {AirlinesModel} from '../models/airlines.model';

@Injectable()
export class AirlinesService {

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

  getCountOfAirlines() {
    return this.http.get('http://localhost:8080/airlines/count', this.httpOptions);
  }

  getTenAirlines(page: number) {
    return this.http.get(`http://localhost:8080/airlines/page=${page}`, this.httpOptions);
  }

  addAirline(airline: AirlinesModel) {
    return this.http.post('http://localhost:8080/airlines', airline, this.httpOptions);
  }

  editAirline(id: number, airline: AirlinesModel) {
    return this.http.put(`http://localhost:8080/airlines/${id}`, airline, this.httpOptions);
  }

  deleteAirline(id: number) {
    return this.http.delete(`http://localhost:8080/airlines/${id}`, this.httpOptions);
  }

}
