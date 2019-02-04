import {Component, Input, OnInit} from '@angular/core';
import {FlightsModel} from "../../shared/models/entity/flight/flights.model";
import {FlightDTOModel} from '../../shared/models/flightDTO.model';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.scss']
})
export class FlightResultComponent implements OnInit {

  @Input() flights: FlightDTOModel[];

  constructor() { }

  ngOnInit() {
  }

}
