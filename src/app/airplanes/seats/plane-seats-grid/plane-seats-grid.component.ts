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

  constructor(
    private colorService: SeatColorService
  ) {
  }

  @Input() public selectedSeats: Set<SeatModel>;
  @Output() public selectedSeatsChange = new EventEmitter<Set<SeatModel>>();
  @Input() public sections: SectionModel[];
  @Output() public sectionsChange = new EventEmitter<SectionModel[]>();
  @Input() public seats: Set<SeatModel>;
  @Input() viewMode = ViewMode.SELECT;
  private setOfSeatTypes: Set<SeatTypeModel>;

  private static maxNumber(nums: number[]): number {
    let maxNum = -1;
    for (const num of nums) {
      if (num > maxNum) {
        maxNum = num;
      }
    }
    return maxNum;
  }

  private static setToTuple(set: Set<any>): any[] {
    const result = [];

    const setIter = set.values();
    let setIterResult = setIter.next();
    while (!setIterResult.done) {
      const item = setIterResult.value;
      result.push(item);
      setIterResult = setIter.next();
    }

    return result;
  }

  private static getSetOfSeatTypes(seats: Set<SeatModel>): Set<SeatTypeModel> {
    console.log('populating set of seat types');
    const seatTypes = new Set<SeatTypeModel>();
    const seatTypeIds = new Set<number>();

    const seatIter = seats.values();
    let seatIterRes = seatIter.next();
    while (!seatIterRes.done) {
      const seatTypeId = seatIterRes.value.seatType.objectId;
      if (!seatTypeIds.has(seatTypeId)) {
        seatTypes.add(seatIterRes.value.seatType);
        seatTypeIds.add(seatTypeId);
      }
      seatIterRes = seatIter.next();
    }
    console.log('set of seat types populated:');
    console.log(seatTypes);
    return seatTypes;
  }

  ngOnInit() {
    console.log('init plane-seats-grid');
    console.log('sections:');
    console.log(this.sections);
    this.setOfSeatTypes = PlaneSeatsGridComponent.getSetOfSeatTypes(this.seats);
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
      console.log('sections are undefined. generating sections...');
      this.sections = [];
      const sTypeIter = this.setOfSeatTypes.values();
      let sTypeIterResult = sTypeIter.next();
      while (!sTypeIterResult.done) {
        const seatType = sTypeIterResult.value;
        const rows = [], cols = [];
        const seatIter = this.seats.values();
        let seatIterRes = seatIter.next();
        while (!seatIterRes.done) {
          const seat = seatIterRes.value;
          if (seat.seatType.objectId === seatType.objectId) {
            // adding 1 to the result because rows are zero-based, whereas number of rows is one-based
            rows.push(seat.row + 1);
            cols.push(seat.col + 1);
          }
          seatIterRes = seatIter.next();
        }

        this.sections.push(new SectionModel(seatType,
          PlaneSeatsGridComponent.maxNumber(rows),
          PlaneSeatsGridComponent.maxNumber(cols)));
        sTypeIterResult = sTypeIter.next();
      }
      console.log('sections generated:');
      console.log(this.sections);
      this.sectionsChange.emit(this.sections);
    }
  }
}
