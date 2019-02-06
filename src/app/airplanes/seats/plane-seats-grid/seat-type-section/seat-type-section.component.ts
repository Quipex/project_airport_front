import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {SeatModel} from '../../../../shared/models/entity/airplane/seat.model';
import {SectionModel} from '../../../data/section-model';
import {ViewMode} from '../plane-seats-grid-modes.model';
import {BookedSeatsService} from '../../../../booking/service/booked-seats.service';
import {FlightDTOModel} from '../../../../shared/models/flightDTO.model';

@Component({
  selector: 'app-seat-type-section',
  templateUrl: './seat-type-section.component.html',
  styleUrls: ['./seat-type-section.component.scss']
})
export class SeatTypeSectionComponent implements OnInit, OnDestroy {

  @Input() selectedSeats: Set<SeatModel>;
  @Output() selectedSeatsChange = new EventEmitter<Set<SeatModel>>();
  @Input() section: SectionModel;
  @Input() seats: Set<SeatModel>;
  @Input() viewMode: ViewMode;
  @Input() flight: FlightDTOModel;
  private bookedSeatIds: number[];
  private bookedSeatsSub: Subscription;

  constructor(
    private bookedSeatsService: BookedSeatsService
  ) {
  }

  ngOnInit() {
    if (this.viewMode === ViewMode.SELECT) {
      this.bookedSeatsSub = this.bookedSeatsService.getBookedSeatsObjectIds(this.flight.objectId).subscribe(data => {
        this.bookedSeatIds = data;
      });
    }
  }

  getSeat(row: number, col: number): SeatModel {
    const seatIter = this.seats.values();
    let seatIterRes = seatIter.next();
    while (!seatIterRes.done) {
      const seat = seatIterRes.value;
      if (seat.row === row && seat.col === col && seat.seatType.objectId === this.section.seatType.objectId) {
        if (this.viewMode === ViewMode.SELECT) {
          seat.cost = this.getSeatBaseCost(seat);
          seat.isBooked = this.isSeatDisabled(seat);
        }
        return seat;
      }
      seatIterRes = seatIter.next();
    }
  }

  getSeatBaseCost(seat: SeatModel): number {
    //FIXME is it really needed?
    if (seat.modifier === null || seat.modifier === undefined) {
      seat.modifier = 1;
    }
    if (seat.seatType.modifier === null || seat.seatType.modifier === undefined) {
      seat.seatType.modifier = 1;
    }
    if (this.flight !== undefined) {
      return seat.modifier * seat.seatType.modifier * this.flight.baseCost;
    }
    return 1000000;
  }

  isSeatDisabled(seat: SeatModel): boolean {
    if (this.bookedSeatIds === undefined) {
      return false;
    }
    for (const seatId of this.bookedSeatIds) {
      if (seat.objectId === seatId) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.bookedSeatsSub !== undefined) {
      this.bookedSeatsSub.unsubscribe();
    }
  }
}
