import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SectionModel} from '../../../../data/section-model';
import {SeatModel} from '../../../../../shared/models/entity/airplane/seat.model';
import {AirplanesModel} from '../../../../../shared/models/entity/airplane/airplanes.model';

@Component({
  selector: 'app-section-editor',
  templateUrl: './section-editor.component.html',
  styleUrls: ['./section-editor.component.scss']
})
export class SectionEditorComponent implements OnInit {

  @Input() section: SectionModel;
  @Input() plane: AirplanesModel;
  @Input() seats: Set<SeatModel>;
  // @Output() sectionChange = new EventEmitter<SectionModel>();
  @Output() seatsChange = new EventEmitter<Set<SeatModel>>();
  private tempRows: number;
  private tempCols: number;
  private tempModifier: number;
  private tempDescr: string;

  constructor() {
  }

  ngOnInit() {
    this.tempCols = this.section.cols;
    this.tempRows = this.section.rows;
    this.tempModifier = this.section.seatType.modifier;
    this.tempDescr = this.section.seatType.description;
  }

  confirm() {
    this.section.rows = this.tempRows;
    this.section.cols = this.tempCols;
    this.section.seatType.modifier = this.tempModifier;
    this.section.seatType.description = this.tempDescr;
    this.reduceSeats();
    this.addSeats();
    this.seatsChange.emit(this.seats);
  }

  changeCols(newValue) {
    if (newValue === '') {
      newValue = 0;
    }
    this.tempCols = newValue;
  }

  changeRows(newValue) {
    if (newValue === '') {
      newValue = 0;
    }
    this.tempRows = newValue;
  }

  changeModifier(newValue) {
    if (newValue === '') {
      newValue = 1;
    }
    this.tempModifier = newValue;
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
          console.log('removed ' + seat);
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
}
