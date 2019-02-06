import {Component, Input, OnInit} from '@angular/core';
import {FlightDTOModel} from '../../shared/models/flightDTO.model';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.scss']
})
export class FlightResultComponent implements OnInit {

  @Input() flights: FlightDTOModel[];
  @Input() returnFlights: FlightDTOModel[];
  @Input() flightType: boolean;
  private returnFlight: FlightDTOModel;
  private departureFlight: FlightDTOModel;

  constructor() {
  }

  ngOnInit() {
  }

  selectReturnFlight(flight: FlightDTOModel) {
    this.returnFlight = flight;
  }

  selectDepartureFlight(flight: FlightDTOModel) {
    console.log(flight);
    this.departureFlight = flight;
  }
}
