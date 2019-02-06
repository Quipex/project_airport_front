import {Component, Input, OnInit} from '@angular/core';
import {FlightsModel} from '../../shared/models/entity/flight/flights.model';
import {SeatModel} from '../../shared/models/entity/airplane/seat.model';

@Component({
  selector: 'app-booking-seats-grid',
  templateUrl: './booking-seats-grid.component.html',
  styleUrls: ['./booking-seats-grid.component.scss']
})
export class BookingSeatsGridComponent implements OnInit {

  @Input() flight: FlightsModel;
  flightSeats: any;
  selectedSeats: Set<SeatModel>;

  constructor() {
  }

  ngOnInit() {
  }

  changeSelectedSeats($event: Set<SeatModel>) {
    this.selectedSeats = $event;
  }
}
