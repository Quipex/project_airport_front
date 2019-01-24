import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

/*import { FlightBookingService } from '../../services/flight-booking.service';
import {SearchFlightModel} from '../../shared/models/searchFlight.model';
import {CityModel} from '../../shared/models/entity/flight/city.model';*/

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.scss'],
  // providers: [FlightBookingService]
})
export class FlightBookingComponent implements OnInit {

  departureCity = '';
  destinationCity = '';
  departureDate;

  currentDay = new Date().getDate();
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  date = new FormControl(new Date());
  minDate = new Date(this.currentYear, this.currentMonth, this.currentDay);
  flightTypes = [
    {'name': 'One way', id: 'oneway'},
    {'name': 'Round trip', id: 'round_trip'}
  ];
  defaultFlightType = this.flightTypes[1].name;

  adultNum = 'option1';
  childrenNum = 'option0';
  ticketClass = 'option1';

  constructor(
  ) { }

  ngOnInit() {
  }

  searchFlight() {
  }
}
