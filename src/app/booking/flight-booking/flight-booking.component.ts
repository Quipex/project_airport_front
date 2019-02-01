import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FlightSearchWrapperModel} from '../../shared/models/flightSearchWrapper.model';
import {FlightDTOModel} from '../../shared/models/flightDTO.model';
import {AuthenticationService} from '../../services/authentication.service';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.scss'],
})
export class FlightBookingComponent implements OnInit {

  departureCity = '';
  destinationCity = '';
  departureDate = new Date();
  returnDate;
  finalSearchString = '';

  currentDay = new Date().getDate();
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  minDate = new Date(this.currentYear, this.currentMonth, this.currentDay);
  flightTypes = [
    {'name': 'One way', id: 'oneway'},
    {'name': 'Round trip', id: 'round_trip'}
  ];
  defaultFlightType = this.flightTypes[0].name;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authenticationService.getToken(),
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  searchFlight() {
    if (this.defaultFlightType === 'One way') {
      let wrapper = new FlightSearchWrapperModel(this.departureCity, this.destinationCity, this.departureDate);
      console.log(this.departureCity, this.destinationCity, this.departureDate, this.returnDate)
      this.searchOneWay(1, wrapper)
        .subscribe((data: FlightDTOModel) => {
          // TODO
        });
    } else if (this.defaultFlightType === 'Round trip') {
      let wrapper = new FlightSearchWrapperModel(this.departureCity, this.destinationCity, this.departureDate, this.returnDate);
      console.log(this.departureCity, this.destinationCity, this.departureDate, this.returnDate)
      this.searchBoth(1, wrapper)
        .subscribe((data: FlightDTOModel) => {
          // TODO
        });
    }
  }

  searchOneWay(page: number, wrapper: FlightSearchWrapperModel) {
    return this.http.post(API_URL + `/flight-booking/search-one-way/page=${page}`, wrapper, this.httpOptions);
  }
  searchBoth(page: number, wrapper: FlightSearchWrapperModel) {
    return this.http.post(API_URL + `/flight-booking/search-both/page=${page}`, wrapper, this.httpOptions);
  }
}
