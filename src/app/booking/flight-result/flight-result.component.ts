import {Component, Input, OnInit} from '@angular/core';
import {FlightsModel} from '../../shared/models/entity/flight/flights.model';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.scss']
})
export class FlightResultComponent implements OnInit {

  @Input() flights: FlightsModel[];
  @Input() returnFlights: FlightsModel[];
  @Input() flightType: boolean;
  private returnFlight: FlightsModel;
  private departureFlight: FlightsModel;

  constructor() { }

  ngOnInit() {
  }

  selectReturnFlight(flight: FlightsModel) {
    this.returnFlight = flight;
  }

  selectDepartureFlight(flight: FlightsModel) {
    this.departureFlight = flight;
  }
}
