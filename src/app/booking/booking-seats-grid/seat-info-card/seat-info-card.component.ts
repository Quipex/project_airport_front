import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SeatModel} from '../../../shared/models/entity/airplane/seat.model';
import {FormControl, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material';
import {PassengerPassportModel} from '../../../shared/models/entity/users/passengers/passengerPasport.model';

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
  @Input() passengers: PassengerPassportModel[];

  @Input() seatToPas: Map<SeatModel, PassengerPassportModel>;
  @Output() seatToPasChange = new EventEmitter<Map<SeatModel, PassengerPassportModel>>();

  passengerSelector = new FormControl('', Validators.required);

  constructor() {
  }

  ngOnInit() {
    this.cardAdded.emit(this.passengerSelector);
  }

  ngOnDestroy(): void {
    this.cardDestroyed.emit(this.index);
  }

  onSelectionChange($event: MatSelectChange) {
    if ($event.value === 'add') {
      this.invokeAddUser();
    } else {
      const pass = new PassengerPassportModel();
      pass.clone($event.value);
      this.seatToPas.set(this.seat, pass);
      this.seatToPasChange.emit(this.seatToPas);
    }
  }

  private invokeAddUser() {
    console.log('adding user; todo');
  }
}
