import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SeatModel} from '../../../shared/models/entity/airplane/seat.model';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-seat-info-card',
  templateUrl: './seat-info-card.component.html',
  styleUrls: ['./seat-info-card.component.scss']
})
export class SeatInfoCardComponent implements OnInit, OnDestroy {

  @Input() seat: SeatModel;

  @Output() cardAdded = new EventEmitter<FormControl>();
  @Output() cardDestroyed = new EventEmitter<number>();

  @Input() index: number;
  passengerSelector = new FormControl('', Validators.required);

  constructor() {
  }

  ngOnInit() {
    this.cardAdded.emit(this.passengerSelector);
  }

  ngOnDestroy(): void {
    this.cardDestroyed.emit(this.index);
  }

}
