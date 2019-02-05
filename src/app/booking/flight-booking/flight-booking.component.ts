import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {FlightSearchWrapperModel} from '../../shared/models/flightSearchWrapper.model';
import {FlightDTOModel} from '../../shared/models/flightDTO.model';
import {AuthenticationService} from '../../services/authentication.service';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AirportModel} from '../../shared/models/entity/flight/airport.model';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.scss'],
  providers: [DatePipe]
})
export class FlightBookingComponent implements OnInit {

  departureCity = '';
  destinationCity = '';
  departureDate = new Date();
  returnDate;
  finalSearchString = '';
  flights: FlightDTOModel[] = [];
  returnFlights: FlightDTOModel[] = [];
  flightType = false;
  showResult = false;

  currentDay = new Date().getDate();
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  minDate = new Date(this.currentYear, this.currentMonth, this.currentDay);
  flightTypes = [
    {'name': 'One way', id: 'oneway'},
    {'name': 'Round trip', id: 'round_trip'}
  ];
  defaultFlightType = this.flightTypes[0].name;
  departureCities: Set<string> = new Set<string>();
  destinationCities: Set<string> = new Set<string>();

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authenticationService.getToken(),
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) { }

  searchForm = new FormGroup({
    departureCity: new FormControl('', [Validators.required]),
    destinationCity: new FormControl('', [Validators.required]),
    departureDate: new FormControl('', [Validators.required])
  });

  ngOnInit() {
  }

  searchFlight() {
    if (this.showResult) {
      this.showResult = false;
    }
    if (!this.searchForm.valid) {
      this.showWarning('All fields are required.');
    } else {
      if (this.defaultFlightType === 'One way') {
        const departureDate = this.datePipe.transform(this.departureDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
        const wrapper = new FlightSearchWrapperModel(this.departureCity, this.destinationCity, departureDate);
        console.log(this.departureCity, this.destinationCity, this.departureDate, this.returnDate);
        this.searchOneWay(1, wrapper)
          .subscribe((data: FlightDTOModel[]) => {
            if (data.length === 0) {
              this.showWarning('There are no flights.');
            } else {
              this.flights = [];
              data.forEach(item => {
                this.flights.push(item);
              });
              this.showResult = true;
            }
          });
      } else if (this.defaultFlightType === 'Round trip') {
        const departureDate = this.datePipe.transform(this.departureDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
        const returnDate = this.datePipe.transform(this.returnDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
        const wrapper = new FlightSearchWrapperModel(this.departureCity, this.destinationCity, departureDate, returnDate);
        console.log(this.departureCity, this.destinationCity, this.departureDate, this.returnDate);
        this.searchBoth(1, wrapper)
          .subscribe((data: any[][]) => {
            if (data.length === 0) {
              this.showWarning('There are no flights.');
            } else {
              this.flights = [];
              this.returnFlights = [];
              data['departureFlights'].forEach((item: FlightDTOModel) => {
                this.flights.push(item);
              });
              data['returnFlights'].forEach((item: FlightDTOModel) => {
                this.returnFlights.push(item);
              });
              this.showResult = true;
            }
          });
      }
    }
  }

  changeFlightType() {
    this.flightType = !this.flightType;
    if (this.flightType) {
      this.searchForm.addControl('returnDate', new FormControl('', [Validators.required]));
    } else {
      this.searchForm.removeControl('returnDate');
    }
  }

  searchOneWay(page: number, wrapper: FlightSearchWrapperModel) {
    return this.http.post(API_URL + `/flight-booking/search-one-way/page=${page}`, wrapper, this.httpOptions);
  }
  searchBoth(page: number, wrapper: FlightSearchWrapperModel) {
    return this.http.post(API_URL + `/flight-booking/search-both/page=${page}`, wrapper, this.httpOptions);
  }

  searchCityName(cityName: string) {
    return this.http.get(API_URL + `/airports/searchCityName/cityName=${cityName}`, this.httpOptions);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  showWarning(message: string) {
    this.toastr.warning(message);
  }

  onKeyUpForDepartureCities(value: KeyboardEvent) {
    if (this.departureCity !== '') {
      this.departureCities = new Set<string>();
      this.searchCityName(this.departureCity)
        .subscribe((data: AirportModel[]) => {
          data.forEach((item: AirportModel) => {
            this.departureCities.add(item.city);
          });
        });
    }
  }

  onKeyUpForDestinationCities(value: KeyboardEvent) {
    if (this.destinationCity !== '') {
      this.destinationCities = new Set<string>();
      this.searchCityName(this.destinationCity)
        .subscribe((data: AirportModel[]) => {
          data.forEach((item: AirportModel) => {
            this.destinationCities.add(item.city);
          });
        });
    }
  }

  goBooking(index: number) {
    let flight = this.flights[index];
    this.router.navigate(['airplane-info', {airplaneId: 40}]);
  }
}
