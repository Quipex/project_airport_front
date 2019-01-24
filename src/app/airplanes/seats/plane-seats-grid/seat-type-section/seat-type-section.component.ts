import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeatModel} from '../../../../shared/models/entity/airplane/seat.model';
import {SectionModel} from './section-model';

@Component({
  selector: 'app-seat-type-section',
  templateUrl: './seat-type-section.component.html',
  styleUrls: ['./seat-type-section.component.scss']
})
export class SeatTypeSectionComponent implements OnInit {

  @Input() selectedSeats: Set<SeatModel>;
  @Output() selectedSeatsChange = new EventEmitter<Set<SeatModel>>();
  @Input() section: SectionModel;
  @Input() seats: SeatModel[];

  constructor() {
  }

  ngOnInit() {
  }

  getSeat(row: number, col: number): SeatModel {
    // console.log(row, col);
    for (const seat of this.seats) {
      if (seat.row === row && seat.col === col && seat.seatType === this.section.seatType) {
        return seat;
      }
    }
  }
}
