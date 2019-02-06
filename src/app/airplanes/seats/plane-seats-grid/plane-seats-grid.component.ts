import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SeatColorService} from '../../data/seat-colors.service';
import {SeatModel} from 'src/app/shared/models/entity/airplane/seat.model';
import {SectionModel} from '../../data/section-model';
import {SeatTypeModel} from '../../../shared/models/entity/airplane/seat-type.model';
import {ViewMode} from './plane-seats-grid-modes.model';
import {SectionStore} from '../../data/section-store.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {FlightsModel} from '../../../shared/models/entity/flight/flights.model';

@Component({
  selector: 'app-plane-seats-grid',
  templateUrl: './plane-seats-grid.component.html',
  styleUrls: ['./plane-seats-grid.component.scss']
})
export class PlaneSeatsGridComponent implements OnInit, OnDestroy {
  @Input() public selectedSeats: Set<SeatModel>;
  @Output() public selectedSeatsChange = new EventEmitter<Set<SeatModel>>();
  @Input() public seats: Set<SeatModel>;
  @Input() viewMode = ViewMode.SELECT;
  @Input() flight: FlightsModel;
  setOfSeatTypes: Set<SeatTypeModel>;
  sections: SectionModel[];
  private airplaneId: number;
  private routeSub: Subscription;
  private sectionSub: Subscription;

  constructor(
    private colorService: SeatColorService,
    private sectionStore: SectionStore,
    private route: ActivatedRoute
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
    // console.log('init plane-seats-grid');
    this.routeSub = this.route.params.subscribe((params: Observable<Params>) => {
      this.airplaneId = params['airplaneId'];
      this.sectionSub = this.sectionStore.getSections(this.airplaneId).subscribe(value => {
        this.sections = value;
        // console.log('sections-renderer:');
        // console.log(this.sections);
      });
      this.setOfSeatTypes = this.getSetOfSeatTypes(this.seats);
      this.generateSections();
      this.assignColorForEachSection();
    });
  }

  private assignColorForEachSection() {
    for (const section of this.sections) {
      section.colorCode = this.colorService.getColorBySeatType(section.seatType);
    }
  }

  private getSetOfSeatTypes(seats: Set<SeatModel>): Set<SeatTypeModel> {
    // console.log('***populating set of seat types');
    const seatTypes = new Set<SeatTypeModel>();
    const seatTypeIds = new Set<number>();

    const seatIter = seats.values();
    // console.log('seats from which seattypes are gathered:');
    // console.log(seats);
    let seatIterRes = seatIter.next();
    while (!seatIterRes.done) {
      const seatTypeId = seatIterRes.value.seatType.objectId;
      if (!seatTypeIds.has(seatTypeId)) {
        seatTypes.add(seatIterRes.value.seatType);
        seatTypeIds.add(seatTypeId);
      }
      seatIterRes = seatIter.next();
    }
    // console.log('set of seat types populated:');
    // console.log(seatTypes);
    return seatTypes;
  }

  private generateSections() {
    // console.log('sections are undefined. generating sections...');
    this.sections = [];
    const sTypeIter = this.setOfSeatTypes.values();
    let sTypeIterResult = sTypeIter.next();
    while (!sTypeIterResult.done) {
      const seatType = sTypeIterResult.value;
      const rows = [], cols = [];
      // console.log('seats when generating sections:');
      // console.log(this.seats);
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
      this.sectionStore.updateSection(this.airplaneId, new SectionModel(seatType,
        PlaneSeatsGridComponent.maxNumber(rows),
        PlaneSeatsGridComponent.maxNumber(cols)));
      sTypeIterResult = sTypeIter.next();
    }
    // console.log('sections generated:');
    // console.log(this.sections);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.sectionSub.unsubscribe();
  }
}
