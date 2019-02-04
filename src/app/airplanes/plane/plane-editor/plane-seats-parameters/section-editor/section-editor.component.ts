import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {SectionModel} from '../../../../data/section-model';
import {SeatModel} from '../../../../../shared/models/entity/airplane/seat.model';
import {AirplanesModel} from '../../../../../shared/models/entity/airplane/airplanes.model';
import {SectionStore} from '../../../../data/section-store.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {RegexValidator} from '../../../../../shared/validator/input-regex-validator';

@Component({
  selector: 'app-section-editor',
  templateUrl: './section-editor.component.html',
  styleUrls: ['./section-editor.component.scss']
})
export class SectionEditorComponent implements OnInit, OnDestroy, OnChanges {

  constructor(
    private sectionStore: SectionStore,
    private route: ActivatedRoute
  ) {
  }

  @Input() section: SectionModel;
  @Input() plane: AirplanesModel;
  @Input() seats: Set<SeatModel>;
  @Output() seatsChange = new EventEmitter<Set<SeatModel>>();
  private tempRows: number;
  private tempCols: number;
  private tempModifier: number;
  private tempDescr: string;
  private planeId: number;
  private routeSub: Subscription;

  ngOnInit() {
    this.tempCols = this.section.cols;
    this.tempRows = this.section.rows;
    this.tempModifier = this.section.seatType.modifier;
    this.tempDescr = this.section.seatType.description;
    this.routeSub = this.route.params.subscribe((params: Observable<Params>) => {
      this.planeId = params['airplaneId'];
    });
  }

  confirm() {
    const updatedSection = this.section;
    updatedSection.rows = this.tempRows;
    updatedSection.cols = this.tempCols;
    updatedSection.seatType.modifier = this.tempModifier;
    updatedSection.seatType.description = this.tempDescr;
    this.sectionStore.updateSection(this.planeId, updatedSection);
    this.reduceSeats();
    this.addSeats();
    this.seatsChange.emit(this.seats);
  }

  changeCols(newValue) {
    // console.log('entered new col value');
    // console.log(newValue);
    if (!RegexValidator.isInteger(newValue)) {
      // console.log('it is not a solid number, so setting to 0');
      newValue = 0;
    }
    // console.log('it becomes');
    console.log(newValue * 2);
    this.tempCols = newValue * 2;
  }

  changeRows(newValue) {
    if (!RegexValidator.isInteger(newValue)) {
      newValue = 0;
    }
    this.tempRows = newValue;
  }

  changeModifier(newValue) {
    // console.log('entered new modif value');
    // console.log(newValue);
    if (!RegexValidator.isFloat(newValue)) {
      // console.log('it is not a float number, so setting to 1');
      newValue = 1;
    }
    // console.log('it becomes');
    console.log(+newValue);
    this.tempModifier = +newValue;
  }

  changeDescription(newValue) {
    this.tempDescr = newValue;
  }

  private reduceSeats() {
    const iterator = this.seats.values();
    let result = iterator.next();
    while (!result.done) {
      const seat = result.value;
      if (seat.seatType.objectId === this.section.seatType.objectId) {
        if (seat.row >= this.section.rows ||
          seat.col >= this.section.cols) {
          this.seats.delete(seat);
          // console.log('removed ' + seat);
        }
      }
      result = iterator.next();
    }
  }

  private addSeats() {
    for (let i = 0; i < this.section.rows; i++) {
      for (let j = 0; j < this.section.cols; j++) {
        const seatIter = this.seats.values();
        let seatRes = seatIter.next();
        let found = false;
        while (!seatRes.done) {
          const seat = seatRes.value;
          if (seat.col === j && seat.row === i && seat.seatType.objectId === this.section.seatType.objectId) {
            found = true;
            break;
          }
          seatRes = seatIter.next();
        }
        if (!found) {
          const newSeat = new SeatModel(j, i, this.plane, this.section.seatType);
          this.seats.add(newSeat);
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const param in changes) {
      if (param === 'section') {
        this.tempCols = this.section.cols;
        this.tempRows = this.section.rows;
        this.tempModifier = this.section.seatType.modifier;
        this.tempDescr = this.section.seatType.description;
      }
    }
  }
}
