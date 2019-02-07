import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FlightDTOModel} from '../../shared/models/flightDTO.model';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.scss']
})
export class FlightResultComponent implements OnInit, OnDestroy {

  @Input() flights: FlightDTOModel[];
  @Input() returnFlights: FlightDTOModel[];
  @Input() flightType: boolean;
  returnFlight: FlightDTOModel;
  departureFlight: FlightDTOModel;
  generatedSeatToPassengerForm: FormGroup;
  private formSub: Subscription;
  formValid: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  selectReturnFlight(flight: FlightDTOModel) {
    this.returnFlight = flight;
  }

  selectDepartureFlight(flight: FlightDTOModel) {
    this.departureFlight = flight;
  }

  resetFlights() {
    this.departureFlight = undefined;
    this.returnFlight = undefined;
  }

  handleStepperSelection($event: StepperSelectionEvent) {
    if ($event.selectedIndex === 0) {
      this.resetFlights();
    }
  }

  onFormStatusChange($event: Observable<any>) {
    this.formSub = $event.subscribe(next => {
      if (next === 'VALID') {
        this.formValid = true;
      } else {
        this.formValid = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }
}
