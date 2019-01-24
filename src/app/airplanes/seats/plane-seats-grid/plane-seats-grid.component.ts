import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeatColorService} from '../../data/seat-colors.service';
import {SeatModel} from 'src/app/shared/models/entity/airplane/seat.model';
import {SectionModel} from '../seats-grid/seat-type-section/section-model';
import {SeatTypeModel} from '../../../shared/models/entity/airplane/seat-type.model';

@Component({
  selector: 'app-airplane-seats',
  templateUrl: './plane-seats-grid.component.html',
  styleUrls: ['./plane-seats-grid.component.scss']
})
export class PlaneSeatsGridComponent implements OnInit {

  constructor(
    private colorService: SeatColorService
  ) {
  }

  @Input() public selectedSeats: Set<SeatModel>;
  @Output() public selectedSeatsChange = new EventEmitter<Set<SeatModel>>();
  @Input() public sections: SectionModel[];
  @Input() public seats: SeatModel[];
  private setOfSeatTypes = new Set<SeatTypeModel>();

  private static maxNumber(nums: number[]): number {
    let maxNum = -1;
    for (const num of nums) {
      if (num > maxNum) {
        maxNum = num;
      }
    }
    return maxNum;
  }

  ngOnInit() {
    this.populateSetOfSeatTypes();
    this.generateSections();
    this.assignColorForEachSection();
  }

  private assignColorForEachSection() {
    for (const section of this.sections) {
      section.colorCode = this.colorService.getColorBySeatType(section.seatType);
    }
  }

  private generateSections() {
    if (this.sections === undefined) {
      this.sections = [];
      const seatTypeIterator = this.setOfSeatTypes.values();
      let result = seatTypeIterator.next();
      while (!result.done) {
        const seatType = result.value;
        const rows = [], cols = [];
        for (const seat of this.seats) {
          if (seat.seatType === seatType) {
            // adding 1 to the result because rows are zero-based, whereas number of rows is one-based
            rows.push(seat.row + 1);
            cols.push(seat.col + 1);
          }
        }

        this.sections.push(new SectionModel(seatType,
          PlaneSeatsGridComponent.maxNumber(rows),
          PlaneSeatsGridComponent.maxNumber(cols)));
        result = seatTypeIterator.next();
      }
    }
  }

  private populateSetOfSeatTypes() {
    for (const seat of this.seats) {
      this.setOfSeatTypes.add(seat.seatType);
    }
  }
}
