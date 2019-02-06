import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FlightsModel} from '../../shared/models/entity/flight/flights.model';
import {SeatModel} from '../../shared/models/entity/airplane/seat.model';
import {SeatsService} from '../../services/seats.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-booking-seats-grid',
  templateUrl: './booking-seats-grid.component.html',
  styleUrls: ['./booking-seats-grid.component.scss']
})
export class BookingSeatsGridComponent implements OnInit, OnChanges, OnDestroy {

  @Input() flight: FlightsModel;
  flightSeats: SeatModel[];
  selectedSeats: Set<SeatModel>;
  private seatsServiceSub: Subscription;

  constructor(
    private seatsService: SeatsService
  ) {
  }

  ngOnInit() {
  }

  changeSelectedSeats($event: Set<SeatModel>) {
    this.selectedSeats = $event;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    for (const parameter in changes) {
      if (parameter === 'flight') {
        if (changes[parameter].currentValue) {
          if (changes[parameter].currentValue.flight.objectId) {
            console.log('flight input has changed', changes[parameter].currentValue);
            this.onFlightsInputChange(changes[parameter].currentValue.flight.objectId);
          }
        }
      }
    }
  }

  private onFlightsInputChange(flightId: number) {
    this.seatsServiceSub = this.seatsService.getByFlightId(flightId)
      .subscribe((seatsFromBack: Object[]) => {
        this.flightSeats = [];
        for (const seatFromBack of seatsFromBack) {
          const tempSeat = new SeatModel();
          tempSeat.clone(seatFromBack);
          this.flightSeats.push(tempSeat);
        }
      })
  }

  ngOnDestroy(): void {
    if (this.seatsServiceSub) {
      this.seatsServiceSub.unsubscribe();
    }
  }
}
