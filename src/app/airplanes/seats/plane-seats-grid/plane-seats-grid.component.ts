import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {SeatColorService} from '../../data/seat-colors.service';
import {SeatModel} from 'src/app/shared/models/entity/airplane/seat.model';
import {SectionModel} from '../../data/section-model';
import {SeatTypeModel} from '../../../shared/models/entity/airplane/seat-type.model';
import {ViewMode} from './plane-seats-grid-modes.model';
import {SectionStore} from '../../data/section-store.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {FlightDTOModel} from '../../../shared/models/flightDTO.model';

@Component({
  selector: 'app-plane-seats-grid',
  templateUrl: './plane-seats-grid.component.html',
  styleUrls: ['./plane-seats-grid.component.scss']
})
export class PlaneSeatsGridComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public selectedSeats: Set<SeatModel>;
  @Output() public selectedSeatsChange = new EventEmitter<Set<SeatModel>>();
  @Input() public seats: Set<SeatModel>;
  @Input() viewMode = ViewMode.SELECT;
  @Input() flight: FlightDTOModel;
  @Output() initEvent = new EventEmitter();
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
    this.initEvent.emit();
    this.routeSub = this.route.params.subscribe((params: Observable<Params>) => {
      const airplaneIdParam = params['airplaneId'];
      // console.log('init plane seats grid: airplaneId=', airplaneIdParam);
      if (airplaneIdParam) {
        this.airplaneId = airplaneIdParam;
        this.subscribeToSections();
        this.generationFromSeats();
      }
    });
  }

  private subscribeToSections() {
    this.sectionSub = this.sectionStore.getSections(this.airplaneId).subscribe(value => {
      this.sections = value;
    });
  }

  private generationFromSeats() {
    this.setOfSeatTypes = PlaneSeatsGridComponent.getSetOfSeatTypes(this.seats);
    this.generateSections();
    this.assignColorForEachSection();
    // console.log('sections after generating from seats', this.sections, this.seats);
  }

  private assignColorForEachSection() {
    for (const section of this.sections) {
      section.colorCode = this.colorService.getColorBySeatType(section.seatType);
    }
  }

  private static getSetOfSeatTypes(seats: Set<SeatModel>): Set<SeatTypeModel> {
    // console.log('getting set of seat types from seats:', seats);
    if (!seats)
      return new Set();

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
    // console.log('set of seatTypes: ', seatTypes);
    return seatTypes;
  }

  private generateSections() {
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
  }

  ngOnDestroy(): void {
    // console.log('seats-grid DESTROYED');
    this.routeSub.unsubscribe();
    this.clearSections();
    this.clearSeats();
    this.clearSelectedSeats();
    if (this.sectionSub) {
      this.sectionSub.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const param in changes) {
      if (param === 'seats') {
        if (this.flight) {
          this.airplaneId = this.flight.flight.airplaneId;
          if (changes[param].currentValue != undefined) {
            this.clearSections();
            this.subscribeToSections();
            this.generationFromSeats();
            this.clearSelectedSeats();
          }
        }
      }
    }
  }

  private clearSelectedSeats() {
    this.selectedSeats = new Set<SeatModel>();
    this.selectedSeatsChange.emit(this.selectedSeats);
  }

  private clearSections() {
    this.sectionStore.clear(this.airplaneId);
    this.sections = [];
  }

  private clearSeats() {
    this.seats = new Set();
  }
}
