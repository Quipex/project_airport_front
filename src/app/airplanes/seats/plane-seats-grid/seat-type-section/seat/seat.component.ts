import {Component, EventEmitter, Input, NgZone, OnInit, Output, Renderer2} from '@angular/core';
import {SeatModel} from 'src/app/shared/models/entity/airplane/seat.model';
import {ViewMode} from '../../plane-seats-grid-modes.model';

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
  @Input() viewMode: ViewMode;
  isSelected: boolean;

  constructor(
    private zone: NgZone,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.isSelected = this.selectedSeats.has(this.seat);
  }

  onClick() {
    switch (this.viewMode) {
      case ViewMode.SELECT:
        this.toggleSelection();
        break;
      case ViewMode.EDIT:
        this.invokeEditModal();
        break;
    }
  }

  private toggleSelection() {
    if (this.selectedSeats.has(this.seat)) {
      this.selectedSeats.delete(this.seat);
      this.isSelected = false;
    } else {
      this.selectedSeats.add(this.seat);
      this.isSelected = true;
    }
    console.log(this.selectedSeats);
    this.selectedSeatsChange.emit(this.selectedSeats);
  }

  private invokeEditModal() {

  }
}
