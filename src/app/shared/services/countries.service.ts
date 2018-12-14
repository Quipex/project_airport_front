import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {CountriesModel} from '../models/countries.model';

@Injectable()
export class CountriesService {

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

  getCountOfCountries() {
    return this.http.get('http://localhost:8080/countries/count', this.httpOptions);
  }

  getTenCountries(page: number) {
    return this.http.get(`http://localhost:8080/countries/page=${page}`, this.httpOptions);
  }

  addCountry(country: CountriesModel) {
    return this.http.post('http://localhost:8080/countries', country, this.httpOptions);
  }

  editCountry(id: number, country: CountriesModel) {
    return this.http.put(`http://localhost:8080/countries/${id}`, country, this.httpOptions);
  }

  deleteCountry(id: number) {
    return this.http.delete(`http://localhost:8080/countries/${id}`, this.httpOptions);
  }

}
