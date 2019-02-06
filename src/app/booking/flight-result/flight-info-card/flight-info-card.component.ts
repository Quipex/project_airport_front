import {Component, Input, OnInit} from '@angular/core';
import {FlightsModel} from '../../../shared/models/entity/flight/flights.model';

@Component({
  selector: 'app-flight-info-card',
  templateUrl: './flight-info-card.component.html',
  styleUrls: ['./flight-info-card.component.scss']
})
export class FlightInfoCardComponent implements OnInit {

  @Input() flight: FlightsModel;

  constructor() {
  }

  ngOnInit() {
  }

}
