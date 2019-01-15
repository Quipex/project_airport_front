import { Component, OnInit } from '@angular/core';
import {AuthResponseModel} from "../../shared/models/authResponse.model";
import {AuthorityModel} from "../../shared/models/entity/users/authority.model";
import {Router} from "@angular/router";
import {FlightsService} from "../../services/flights.service";
import {FlightDTOModel} from "../../shared/models/flightDTO.model";
import {TicketsModel} from "../../shared/models/entity/flight/tickets.model";
import {PassengersModel} from "../../shared/models/entity/users/passengers.model";
import {FlightsModel} from "../../shared/models/entity/flight/flights.model";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
  providers: [FlightsService]
})
export class FlightsComponent implements OnInit {
  
  userLogin: string;
  items: FlightDTOModel[] = [];
  flights: FlightsModel[] = [];
  tickets: TicketsModel[] = [];
  passengers: PassengersModel[] = [];

  constructor(
    private router: Router,
    private flightsService: FlightsService
  ) { }

  ngOnInit() {
    const currentUser: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.authority === null) {
      this.router.navigateByUrl('login');
    } else if (currentUser.authority !== AuthorityModel.ROLE_USER.toString()) {
      this.router.navigateByUrl('home');
    }

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

