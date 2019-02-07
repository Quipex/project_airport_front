import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {SeatModel} from '../../shared/models/entity/airplane/seat.model';
import {SeatsService} from '../../services/seats.service';
import {Subscription} from 'rxjs';
import {FlightDTOModel} from '../../shared/models/flightDTO.model';

@Component({
  selector: 'app-booking-seats-grid',
  templateUrl: './booking-seats-grid.component.html',
  styleUrls: ['./booking-seats-grid.component.scss']
})
export class BookingSeatsGridComponent implements OnInit, OnChanges, OnDestroy {

  @Input() flight: FlightDTOModel;
  seats: Set<SeatModel>;
  selectedSeats = new Set<SeatModel>();
  private bookedSeatsServiceSub: Subscription;
  private planeSeatsServiceSub: Subscription;

  constructor(
    private seatsService: SeatsService
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const parameter in changes) {
      if (parameter === 'flight') {
        const newFlight = changes[parameter].currentValue;
        if (newFlight) {
          if (newFlight.flight.objectId) {
            this.onFlightsInputChange(newFlight.flight);
          }
        }
      }
    }
  }

  private onFlightsInputChange(flight) {
    this.planeSeatsServiceSub = this.seatsService.getByPlaneId(flight.airplaneId)
      .subscribe((seats: Object[]) => {
        this.seats = new Set();
        for (const seat of seats) {
          const tempSeat = new SeatModel();
          tempSeat.clone(seat);
          this.seats.add(tempSeat);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.bookedSeatsServiceSub) {
      this.bookedSeatsServiceSub.unsubscribe();
    }
    if (this.planeSeatsServiceSub) {
      this.planeSeatsServiceSub.unsubscribe();
    }
  }
}
