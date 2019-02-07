import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {SeatModel} from '../../shared/models/entity/airplane/seat.model';
import {SeatsService} from '../../services/seats.service';
import {Observable, Subscription} from 'rxjs';
import {FlightDTOModel} from '../../shared/models/flightDTO.model';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {minArrayLengthValidator} from './min-array-length.validator';
import {PassengersModel} from '../../shared/models/entity/users/passengers/passengers.model';
import {PassengersService} from '../../services/passengers.service';
import {AuthResponseModel} from '../../shared/models/authResponse.model';
import {PassengerPassportModel} from '../../shared/models/entity/users/passengers/passengerPasport.model';
import {PassportModel} from '../../shared/models/entity/users/passengers/passport.model';

@Component({
  selector: 'app-booking-seats-grid',
  templateUrl: './booking-seats-grid.component.html',
  styleUrls: ['./booking-seats-grid.component.scss']
})
export class BookingSeatsGridComponent implements OnInit, OnChanges, OnDestroy {

  @Input() flight: FlightDTOModel;
  @Output() formStatusChanges = new EventEmitter<Observable<any>>();
  seats: Set<SeatModel>;
  selectedSeats = new Set<SeatModel>();
  selectedSeatsForm: FormGroup;
  userPassengers: PassengersModel[];
  private bookedSeatsServiceSub: Subscription;
  private planeSeatsServiceSub: Subscription;
  private passengersSub: Subscription;

  constructor(
    private seatsService: SeatsService,
    private passengersService: PassengersService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    const currentUser: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    this.populatePassengers(currentUser.login);
    this.generateSeatsForm();
  }

  private populatePassengers(login: string) {
    this.passengersSub = this.passengersService
      .getAllByUserLogin(login).subscribe((next: PassengerPassportModel[]) => {
        this.userPassengers = [];
        for (const item of next) {
          const passenger = new PassengersModel();
          passenger.lastName = item.passenger.lastName;
          passenger.firstName = item.passenger.firstName;

          const passport = new PassportModel();
          passport.clone(item.passport);
          passenger.passport = passport;

          const p_p = new PassengerPassportModel(passenger, passport);
          this.userPassengers.push(p_p);
        }
      });
  }

  private generateSeatsForm() {
    this.selectedSeatsForm = this.fb.group({
      selSeats: this.fb.array([], minArrayLengthValidator(1))
    });
    console.log('emitting observable', this.selectedSeatsForm.statusChanges);
    this.formStatusChanges.emit(this.selectedSeatsForm.statusChanges);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const parameter in changes) {
      if (parameter === 'flight') {
        const newFlight = changes[parameter].currentValue;
        if (newFlight) {
          if (newFlight.flight.objectId) {
            this.onFlightsInputChange(newFlight.flight);
          }
        }
      }
    }
  }

  private onFlightsInputChange(flight) {
    this.planeSeatsServiceSub = this.seatsService.getByPlaneId(flight.airplaneId)
      .subscribe((seats: Object[]) => {
        this.seats = new Set();
        for (const seat of seats) {
          const tempSeat = new SeatModel();
          tempSeat.clone(seat);
          this.seats.add(tempSeat);
        }
      });
  }

  ngOnDestroy(): void {
    // console.log('DESTROY booking seats-grid');

    if (this.bookedSeatsServiceSub) {
      this.bookedSeatsServiceSub.unsubscribe();
    }
    if (this.planeSeatsServiceSub) {
      this.planeSeatsServiceSub.unsubscribe();
    }
    if (this.passengersSub) {
      this.passengersSub.unsubscribe();
    }
  }

  addFormControl(control: AbstractControl) {
    this.selSeatsArr.push(control);
  }

  get selSeatsArr() {
    return this.selectedSeatsForm.get('selSeats') as FormArray;
  }

  removeFormControl(index: number) {
    this.selSeatsArr.removeAt(index);
  }

  onSeatsGridInit() {
    this.generateSeatsForm();
  }

  getFullPrice() {
    let price = 0;

    const selSeatsIter = this.selectedSeats.values();
    let selSeatsRes = selSeatsIter.next();
    while (!selSeatsRes.done) {
      const res = selSeatsRes.value.cost;
      price += res;
      selSeatsRes = selSeatsIter.next()
    }

    return price;
  }
}
