import {Component, OnInit} from '@angular/core';
import {AuthResponseModel} from '../../shared/models/authResponse.model';
import {Router} from '@angular/router';
import {FlightsService} from '../../services/flights.service';
import {FlightDTOModel} from '../../shared/models/flightDTO.model';
import {FlightsModel} from '../../shared/models/entity/flight/flights.model';
import {TicketsModel} from '../../shared/models/entity/flight/tickets.model';
import {PassengersModel} from '../../shared/models/entity/users/passengers/passengers.model';

@Component({
  selector: 'app-user-flights',
  templateUrl: './user-flights.component.html',
  styleUrls: ['./user-flights.component.scss'],
  providers: [FlightsService]
})
export class UserFlightsComponent implements OnInit {

  userLogin: string;
  items: FlightDTOModel[] = [];
  flights: FlightsModel[] = [];
  tickets: TicketsModel[] = [];
  passengers: PassengersModel[] = [];

  constructor(
    private router: Router,
    private flightsService: FlightsService
  ) {
  }

  ngOnInit() {
    const currentUser: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    this.userLogin = currentUser.login;
    this.getFlights();
  }

  getFlights() {
    this.flightsService.getFlightsByUserLogin(this.userLogin, 1)
      .subscribe(
        (response: FlightsModel[]) => {
          this.items = response;
          this.fillArray();
        },
        (error) => console.log(error)
      );
  }

  fillArray() {
    const passengersToDisplay = this.items.forEach(element => {
      element.passengers.forEach(passenger => {
        element.passports.forEach(passport => {
          passenger.passport = passport;
        })
      })
    });
  }


}

