import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeatModel} from '../../../../shared/models/entity/airplane/seat.model';
import {SectionModel} from './section-model';
import {ViewMode} from '../plane-seats-grid-modes.model';

@Component({
  selector: 'app-seat-type-section',
  templateUrl: './seat-type-section.component.html',
  styleUrls: ['./seat-type-section.component.scss']
})
export class SeatTypeSectionComponent implements OnInit {

  @Input() selectedSeats: Set<SeatModel>;
  @Output() selectedSeatsChange = new EventEmitter<Set<SeatModel>>();
  @Input() section: SectionModel;
  @Input() seats: Set<SeatModel>;
  @Input() viewMode: ViewMode;

  constructor() {
  }

  ngOnInit() {
  }

  getSeat(row: number, col: number): SeatModel {
    // console.log(row, col);
    const seatIter = this.seats.values();
    let seatIterRes = seatIter.next();
    while (!seatIterRes.done) {
      const seat = seatIterRes.value;
      if (seat.row === row && seat.col === col && seat.seatType === this.section.seatType) {
        return seat;
      }
      seatIterRes = seatIter.next();
    }
  }
}
