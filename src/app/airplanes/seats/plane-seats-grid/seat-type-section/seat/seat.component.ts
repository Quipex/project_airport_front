import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {SeatModel} from 'src/app/shared/models/entity/airplane/seat.model';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss']
})
export class SeatComponent implements OnInit {

  @Input() public colorCode = '#9b0300';
  @Input() public seat: SeatModel;
  @Input() public selectedSeats: Set<SeatModel> = new Set();
  @Output() public selectedSeatsChange = new EventEmitter<Set<SeatModel>>();
  isSelected: boolean;

  constructor(
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    this.isSelected = this.selectedSeats.has(this.seat);
  }

  toggleSelection() {
    if (this.selectedSeats.has(this.seat)) {
      this.selectedSeats.delete(this.seat);
      this.zone.run(() => {
        this.isSelected = false;
      });
    } else {
      this.selectedSeats.add(this.seat);
      this.zone.run(() => {
        this.isSelected = true;
      });
    }
    console.log(this.selectedSeats);
    this.selectedSeatsChange.emit(this.selectedSeats);
  }
}