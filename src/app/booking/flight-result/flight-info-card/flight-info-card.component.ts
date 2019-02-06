import {Component, Input, OnInit} from '@angular/core';
import {FlightDTOModel} from '../../../shared/models/flightDTO.model';

@Component({
  selector: 'app-flight-info-card',
  templateUrl: './flight-info-card.component.html',
  styleUrls: ['./flight-info-card.component.scss']
})
export class FlightInfoCardComponent implements OnInit {

  @Input() flight: FlightDTOModel;

  constructor() {
  }

  ngOnInit() {
  }

}
