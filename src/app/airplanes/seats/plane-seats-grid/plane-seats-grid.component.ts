import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeatColorService} from '../../data/seat-colors.service';
import {SeatModel} from 'src/app/shared/models/entity/airplane/seat.model';
import {SectionModel} from './seat-type-section/section-model';
import {SeatTypeModel} from '../../../shared/models/entity/airplane/seat-type.model';
import {ViewMode} from './plane-seats-grid-modes.model';

@Component({
  selector: 'app-airplane-seats',
  templateUrl: './plane-seats-grid.component.html',
  styleUrls: ['./plane-seats-grid.component.scss']
})
export class PlaneSeatsGridComponent implements OnInit {

  @Input() public selectedSeats: Set<SeatModel>;
  @Output() public selectedSeatsChange = new EventEmitter<Set<SeatModel>>();
  @Input() public sections: SectionModel[];
  @Output() public sectionsChange = new EventEmitter<SectionModel[]>();
  @Input() public seats: Set<SeatModel>;
  @Input() viewMode = ViewMode.SELECT;
  private setOfSeatTypes = new Set<SeatTypeModel>();

  constructor(
    private colorService: SeatColorService
  ) {
  }

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
      const sTypeIter = this.setOfSeatTypes.values();
      let sTypeIterRes = sTypeIter.next();
      while (!sTypeIterRes.done) {
        const seatType = sTypeIterRes.value;
        const rows = [], cols = [];
        const seatIter = this.seats.values();
        let seatIterRes = seatIter.next();
        while (!seatIterRes.done) {
          const seat = seatIterRes.value;
          if (seat.seatType === seatType) {
            // adding 1 to the result because rows are zero-based, whereas number of rows is one-based
            rows.push(seat.row + 1);
            cols.push(seat.col + 1);
          }
          seatIterRes = seatIter.next();
        }

        this.sections.push(new SectionModel(seatType,
          PlaneSeatsGridComponent.maxNumber(rows),
          PlaneSeatsGridComponent.maxNumber(cols)));
        sTypeIterRes = sTypeIter.next();
      }
      this.sectionsChange.emit(this.sections);
    }
  }

  private populateSetOfSeatTypes() {
    const seatIter = this.seats.values();
    let seatIterRes = seatIter.next();
    while (!seatIterRes.done) {
      const seat = seatIterRes.value;
      this.setOfSeatTypes.add(seat.seatType);
      seatIterRes = seatIter.next();
    }
  }
}
